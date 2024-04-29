import { getAllTutorUseCase } from '@/use-cases/factories/tutor/make-getall-tutors';
import { FastifyReply, FastifyRequest } from 'fastify'
import { getAllTutorsError } from '@/use-cases/errors/tutor-error';
import { z } from 'zod';
import { getNameTutors } from '@/use-cases/factories/tutor/meke-get-name-tutor';
import { getPhoneTutors } from '@/use-cases/factories/tutor/make-getPhoneTutors'


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

	} catch (err) {

		if (err instanceof getAllTutorsError) {
			return reply.status(404).send({ message: err.message })
		};

		throw err
	};
}


export async function getTutorByName(request: FastifyRequest, reply: FastifyReply) {
	const searchTutorQuerySchema = z.object({
		q: z.string(),
		page: z.coerce.number().min(1).default(1),
	})


	const { q, page } = searchTutorQuerySchema.parse(request.query)
	const queryWithoutSpaces = q.replace('-', ' ');


	const searchNameTutorUseCase = getNameTutors()

	const { tutors } = await searchNameTutorUseCase.execute({
		query: queryWithoutSpaces,
		page,
	})

	return reply.status(200).send({
		tutors,
	})
}

export async function searchPhoneTutors(request: FastifyRequest, reply: FastifyReply) {
	const searchGymsQuerySchema = z.object({
		q: z.string(),
		page: z.coerce.number().min(1).default(1),
	})

	const { q, page } = searchGymsQuerySchema.parse(request.query)

	const searchPhoneTutorUseCase = getPhoneTutors()

	const { tutors } = await searchPhoneTutorUseCase.execute({
		query: q,
		page,
	})

	return reply.status(200).send({
		tutors,
	})
}
