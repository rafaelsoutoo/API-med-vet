import { getAllConsultsUseCase } from '@/use-cases/factories/make-get-consults';
import { FastifyReply, FastifyRequest } from 'fastify'
import { getAllConsultsError } from '@/use-cases/errors/get-all-consults';
import { z } from 'zod';

export async function getAllConsults(request: FastifyRequest, reply: FastifyReply) {
	// const getAllQuerySchema = z.object({
    //     page: z.coerce.number(),
	// 	numberOfItems: z.coerce.number()
    // });

    // const { page, numberOfItems } = getAllQuerySchema.parse(request.query);

	try {
				
		const getAllConsults = getAllConsultsUseCase();
		const data = await getAllConsults.execute();

		return data;

	} catch(err) {

		if (err instanceof getAllConsultsError) {
			return reply.status(413).send({ message: err.message })
		};

		throw err
	};
}
