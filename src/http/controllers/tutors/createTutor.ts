import { TutorAlreadyExistsError } from '@/use-cases/errors/tutor-already-exists';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '@/use-cases/factories/make-create-tutors';
import { Validation } from '@/utils/validation'


export async function createTutor(request: FastifyRequest, reply: FastifyReply) {

	const registerBodySchema = z.object({
		name: z.string(),
		cpf: z.string().refine(Validation.isValidCPF, {
			message: "CPF inválido",
		}),
		phone: z.string().refine(Validation.isValidPhoneNumber, {
			message: "Numero de contato inválido",
		}),
		email: z.string().email(),
		description: z.string().nullable(),
		animals: z.string().nullable(),
		consults: z.string().nullable(),
	});

	const { name, cpf, phone, email, description, animals, consults } = registerBodySchema.parse(request.body);

	try {
		const registerUserCase = makeRegisterUseCase()

		await registerUserCase.execute({
			name,
			cpf,
			phone,
			email,
			description,
			animals,
			consults
		})
	} catch(err) {
		if (err instanceof TutorAlreadyExistsError) {
			return reply.status(409).send({ message: err.message })
		}

		throw err
	}

	return reply.status(201).send()
}
