import { TutorNotExistsError } from '@/use-cases/errors/tutor-error';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateAnimalUseCase } from '@/use-cases/factories/animals/make-create-animal';
import { Validation } from '@/utils/validation'


export async function createAnimals(request: FastifyRequest, reply: FastifyReply) {

	const validateIdParamsSchema = z.object({
		tutor_id: z.string(),
	})



	const animalsCreateBodySchema = z.object({
		name: z.string(),
		species: z.string(),
		age: z.string(),
		gender: z.string(),
		coat: z.string().nullable(),
		race: z.string().nullable(),

	});

   

	const { name, species, race, gender, age, coat,  } = animalsCreateBodySchema.parse(request.body);
	const { tutor_id } = validateIdParamsSchema.parse(request.params)

	try {
		const createAnimalUserCase = makeCreateAnimalUseCase()

		await createAnimalUserCase.execute({
			name, species, race, gender, age, coat, tutor_id
		})
	} catch (err) {
		if (err instanceof TutorNotExistsError) {
			return reply.status(409).send({ message: err.message })
		}

		throw err
	}

	return reply.status(201).send()
}
