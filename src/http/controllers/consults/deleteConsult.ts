import { MakeDeleteConsultUseCase } from '@/use-cases/factories/consult/make-delete-consult';
import { TutorNotExistsError } from '@/use-cases/errors/tutor-error';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function deleteConsult(request: FastifyRequest, reply: FastifyReply) {

	const updateBodySchema = z.object({
		id: z.string(),
	});

	const { id } = updateBodySchema.parse(request.params);
	
	try {
		const updateUserCase = MakeDeleteConsultUseCase()

		await updateUserCase.execute({
			id
		})
	} catch (err) {
		if (err instanceof TutorNotExistsError) {
			return reply.status(409).send({ message: err.message })
		}

		throw err
	}

	return reply.status(200).send()
}
