import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'



function isValidCPF(cpf: string): boolean {
    let sum;
    let rest;
    sum = 0;

    if (cpf === "00000000000") return false;

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}



export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    cpf: z.string().refine(isValidCPF, {
        message: "CPF inválido",
    }),
    password: z.string().min(6)
  })

  const {  cpf, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({  //esse caso de uso retorna o user
      cpf,
      password
    })

    
    const token = await reply.jwtSign( //resposta, criar o novo token
    {
      role: user.role,
    },
    {
      sign: {
        sub: user.id,
      },
    },
  )



    return reply.status(200).send({
        user,
        token,
    });


  } catch (err) {
    if (err instanceof InvalidCredentialsError) {  //se for um erro do erro personalizado
        return reply.status(400).send({ message: err.message })
      }

    throw err
  }

 
}