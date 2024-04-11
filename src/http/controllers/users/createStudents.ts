import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '@/use-cases/factories/make-create-students'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { Validation } from '@/utils/validation'


export async function createStudent(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        cpf: z.string().refine(Validation.isValidCPF, {
            message: "CPF inválido",
        }),
        password: z.string(),
        registration: z.string(),
        course: z.string().nullable(),
        shift: z.string().nullable(), // Certifique-se de que este campo está definido como nullable
        period: z.string().nullable(),
        phone: z.string().nullable(),
    });

    const { name, email, cpf, password, registration, course, shift, period, phone } = registerBodySchema.parse(request.body);

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
            period,
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
