import { makeDeleteUseCase } from '@/use-cases/factories/users/teacher/make-delete-teacher';
import { NoExistsUsersError } from '@/use-cases/errors/user-error';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function deleteTeacher(request: FastifyRequest, reply: FastifyReply) {

	const deleteBodySchema = z.object({
		id: z.string(),
	});

	const { id } = deleteBodySchema.parse(request.params);

	try {
		const deleteUserCase = makeDeleteUseCase()

		await deleteUserCase.execute({
			id
		})
	} catch (err) {
		if (err instanceof NoExistsUsersError) {
			return reply.status(409).send({ message: err.message })
		}

		throw err
	}

	return reply.status(201).send()
}
