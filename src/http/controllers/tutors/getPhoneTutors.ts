import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { getPhoneTutors } from '@/use-cases/factories/tutor/make-getPhoneTutors'

export async function searchPhoneTutors(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),//por padrão é um, e passa para numero, pois o query é string
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