import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase} from '@/use-cases/factories/make-create-teachers'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'


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

export async function createTeacher(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        cpf: z.string().refine(isValidCPF, {
            message: "CPF inválido",
        }),
        password: z.string(),
        registration: z.string(),
        course: z.string().nullable(),
        shift: z.string().nullable(), // Certifique-se de que este campo está definido como nullable
        phone: z.string().nullable(),
    });

    const { name, email, cpf, password, registration, course, shift, phone } = registerBodySchema.parse(request.body);

    try {

        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
            name,
            email,
            cpf,
            password,
            registration,
            course,
            shift,
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