import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeMarkAsDeleteUseCase } from '@/use-case/factories/enchiridion/make-delete-enchiridion'
import { z } from 'zod'


export async function DeleteEnchiridion(request: FastifyRequest, reply: FastifyReply) {
    const validateBody = z.object({
        id: z.string()
    })

    const { id } = validateBody.parse(request.body)

    try {
        const deleteEchiridionUseCase = makeMarkAsDeleteUseCase()

        await deleteEchiridionUseCase.execute(id)

        return reply.status(200).send()
    } catch {
        if (err instanceof EnchiridionNotExitsError) {
            return reply.status(409).send({message: err.message})
        }

        throw err
    }
}
