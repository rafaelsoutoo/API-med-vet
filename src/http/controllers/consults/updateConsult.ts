import { MakeUpdateConsultUseCase } from '@/use-cases/factories/consults/make-update-consult';
import { ConsultsNotExitsError } from '@/use-cases/errors/consult-error';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { Validation } from '@/utils/validation'


export async function updateConsult(request: FastifyRequest, reply: FastifyReply) {

	const updateBodySchema = z.object({
		id: z.string(),
		nameAnimal: z.string(),
		tutor_id: z.string(),
		species: z.string(),
		stringDate: z.string().refine(Validation.isValidDate, {
			message: "data inválida"
		}),
		phone: z.string().refine(Validation.isValidPhoneNumber, {
			message: "Numero de contato inválido",
		}),
		description: z.string().nullable()
	});


	const { id, nameAnimal, tutor_id, species, stringDate, phone, description } = updateBodySchema.parse(request.body);

	try {
		const updateUserCase = MakeUpdateConsultUseCase()

		await updateUserCase.execute({
			id,
			tutor_id,
			nameAnimal,
			species,
			stringDate,
			phone,
			description,
		})
	} catch (err) {
		if (err instanceof ConsultsNotExitsError) {
			return reply.status(409).send({ message: err.message })
		}

		throw err
	}

	return reply.status(201).send()
}
