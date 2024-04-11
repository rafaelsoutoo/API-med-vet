import { isValidCPF } from '../users';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '@/use-cases/factories/make-create-students'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

class createTutor(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		name = z.string(),
		cpf = z.string().refine(isValidCPF, {
			message: "CPF inválido",
		}),
		phone = z.string()
	}
	)
}
