import { makeGetPrescriptionUseCase } from "@/use-cases/factories/prescription/make-get-prescription";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { generatePrescriptionPDF } from "@/service/generatePrescriptionPDF";
import { PrescriptionNoExist } from "@/use-cases/errors/prescription-errors";

export async function PDFPrescriptionById(request: FastifyRequest, reply: FastifyReply) {
    const validateIdParamsSchema = z.object({
        prescription_id: z.string(),
    });

    const { prescription_id } = validateIdParamsSchema.parse(request.params);

    try {
        const useCase = makeGetPrescriptionUseCase();
        const prescriptionData = await useCase.execute(prescription_id);

        const pdfBuffer = await generatePrescriptionPDF(prescriptionData);

        reply.header('Content-Type', 'application/pdf'); 
        reply.header('Content-Disposition', 'inline; filename=prescription.pdf'); 
        
        return reply.status(200).send(pdfBuffer);
    } catch (error) {
        if(error instanceof PrescriptionNoExist){
            return reply.status(409).send({ message: error.message })
        }
        throw error
    }
}
