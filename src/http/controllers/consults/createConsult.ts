import { TutorAlreadyExistsError } from '@/use-cases/errors/tutor-already-exists';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '@/use-cases/factories/make-create-consult';
import { Validation } from '@/utils/validation'


export async function createConsult(request: FastifyRequest, reply: FastifyReply) {

	const registerBodySchema = z.object({
		nameAnimal: z.string(),
        species: z.string(),
        nameTutor: z.string(),
        date: z.string(),
		phone: z.string().refine(Validation.isValidPhoneNumber, {
			message: "Numero de contato inválido",
		}),
		
		description: z.string().nullable(),
		
	});

	const { nameAnimal, date, description, species, phone, nameTutor  } = registerBodySchema.parse(request.body);

	try {
		const registerUserCase = makeRegisterUseCase()

		await registerUserCase.execute({
			nameAnimal, date, description, species, phone, nameTutor
		})
	} catch(err) {
		if (err instanceof TutorAlreadyExistsError) {
			return reply.status(409).send({ message: err.message })
		}

		throw err
	}

	return reply.status(201).send()
}
