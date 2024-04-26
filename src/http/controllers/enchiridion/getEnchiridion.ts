import { TutorNotExistsError } from '@/use-cases/errors/tutor-error';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makegetTutorIdEnchiridionUseCase} from '@/use-cases/factories/enchiridion/make-get-enchridiun-by-animal'
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

	return reply.status(201).send()
}
