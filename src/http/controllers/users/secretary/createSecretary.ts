import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase} from '@/use-cases/factories/users/secretary/make-create-secretarys'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-error'
import { Validation } from '@/utils/validation'


export async function createSecretary(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        cpf: z.string().refine(Validation.isValidCPF, {
            message: "CPF inválido",
        }),
        password: z.string(),
        phone: z.string().nullable(),
    });

    const { name, email, cpf, password, phone } = registerBodySchema.parse(request.body);

    try {

        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
            name,
            email,
            cpf,
            password,
            phone
        })
    } catch (err) {

        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }

    return reply.status(201).send()
}
