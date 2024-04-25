import { getAllConsultsUseCase } from '@/use-cases/factories/make-get-consults';
import { FastifyReply, FastifyRequest } from 'fastify'
import { getAllConsultsError } from '@/use-cases/errors/get-all-consults-error';

export async function getAllConsults(request: FastifyRequest, reply: FastifyReply) {
	try {

		const getAllConsults = getAllConsultsUseCase();
		const data = await getAllConsults.execute();

		return data;

	} catch (err) {

		if (err instanceof getAllConsultsError) {
			return reply.status(413).send({ message: err.message })
		};

		throw err
	};
}
