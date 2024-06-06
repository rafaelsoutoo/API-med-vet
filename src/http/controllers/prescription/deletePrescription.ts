import { MakeMarkAsDelete } from "@/use-cases/factories/animals/make-delete-animal";
import { PrescriptionNotExists } from "@/use-cases/errors/prescription-errors";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletePrescription(reply: FastifyReply, request: FastifyRequest) {
    
    const DeleteSchemaBody = z.object({
        id: z.string()
    })

    const { id } = DeleteSchemaBody.parse(request.body)

    try{
        const deletePrescription = MakeMarkAsDelete()

        await deletePrescription.execute(id)
    } catch(err) {
        if(err instanceof PrescriptionNotExists){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }

    return reply.status(200).send()
}