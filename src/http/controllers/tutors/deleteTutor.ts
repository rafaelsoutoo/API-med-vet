import { MakeDeleteTutorUseCase } from '@/use-cases/factories/tutor/make-delete-tutor';
import { TutorNotExistsError } from '@/use-cases/errors/tutor-error';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function deleteTutor(request: FastifyRequest, reply: FastifyReply) {

	const deleteBodySchema = z.object({
		id: z.string(),
	});

	const { id } = deleteBodySchema.parse(request.query);

	try {
		const updateUserCase = MakeDeleteTutorUseCase()

		await updateUserCase.execute({
			id
		})
	} catch (err) {
		if (err instanceof TutorNotExistsError) {
			return reply.status(409).send({ message: err.message })
		}

		throw err
	}

	return reply.status(201).send()
}
