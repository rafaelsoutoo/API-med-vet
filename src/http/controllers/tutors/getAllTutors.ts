import { getAllTutorUseCase } from '@/use-cases/factories/get-all-tutors';
import { FastifyReply, FastifyRequest } from 'fastify'
import { getAllTutorsError } from '@/use-cases/errors/get-all-tutor'
import { z } from 'zod';

export async function getAllTutors(request: FastifyRequest, reply: FastifyReply) {
	const getAllQuerySchema = z.object({
        page: z.coerce.number(),
		numberOfItems: z.coerce.number()
    });

    const { page, numberOfItems } = getAllQuerySchema.parse(request.query);

	try {
				
		const getTutorUseCase = getAllTutorUseCase();
		const data = await getTutorUseCase.execute(page, numberOfItems);

		return data;

	} catch(err) {

		if (err instanceof getAllTutorsError) {
			return reply.status(413).send({ message: err.message })
		};

		throw err
	};
}
