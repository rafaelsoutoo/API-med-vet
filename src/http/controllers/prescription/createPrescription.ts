import { EnchiridionNotExitsError } from "@/use-cases/errors/enchiridion-errors";
import { makeCreatePrescriptionUseCase } from "@/use-cases/factories/prescription/make-create-prescription";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPrescription(request: FastifyRequest, reply: FastifyReply) {
    const validateIdParamsSchema = z.object({
        enchiridion_id: z.string(),
        medications: z.any()
    });

    const { enchiridion_id, medications } = validateIdParamsSchema.parse(request.body);

    try {
        const createPrescriptionUseCase = makeCreatePrescriptionUseCase();

        await createPrescriptionUseCase.execute({
            enchiridion_id,
            medications
        });

    } catch (error) {
        if (error instanceof EnchiridionNotExitsError) {
            return reply.status(409).send({ message: error.message });
        }
        throw error;
    }
    return reply.status(201).send();
}
