import { TutorNotExistsError } from '@/use-cases/errors/tutor-error';
import { AnimalNoexists} from '@/use-cases/errors/animal-errors';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makegetTutorIdEnchiridionUseCase} from '@/use-cases/factories/enchiridion/make-get-enchridiun-by-tutor'
import { makegetAnimalIdEnchiridionUseCase} from '@/use-cases/factories/enchiridion/make-get-enchridiun-by-animal'
import { Validation } from '@/utils/validation'


export async function getEnchilridionByTutor(request: FastifyRequest, reply: FastifyReply) {

	const validateIdParamsSchema = z.object({
		tutor_id: z.string(),
	})


	const { tutor_id } = validateIdParamsSchema.parse(request.params)

	try {
		const getTutorIdEnchiridionUseCase =  makegetTutorIdEnchiridionUseCase()

		const data = await getTutorIdEnchiridionUseCase.execute({
			 tutor_id
		})

        return data


	} catch (err) {
		if (err instanceof TutorNotExistsError) {
			return reply.status(409).send({ message: err.message })
		}

		throw err
	}

	
}



export async function getEnchilridionByAnimal(request: FastifyRequest, reply: FastifyReply) {

	const validateIdParamsSchema = z.object({
		animal_id: z.string(),
	})


	const { animal_id } = validateIdParamsSchema.parse(request.params)

	try {
		const getAnimalIdEnchiridionUseCase =  makegetAnimalIdEnchiridionUseCase()

		const data = await getAnimalIdEnchiridionUseCase.execute({
			animal_id
		})

        return data


	} catch (err) {
		if (err instanceof AnimalNoexists) {
			return reply.status(409).send({ message: err.message })
		}

		throw err
	}

	
}

