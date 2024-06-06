import { makeGetPrescriptionUseCase } from "@/use-cases/factories/prescription/make-get-prescription";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { generatePrescriptionPDF } from "@/service/generatePrescriptionPDF";

export async function getPrescriptionById(request: FastifyRequest, reply: FastifyReply) {
    const validateIdParamsSchema = z.object({
        prescription_id: z.string(),
    });

    const { prescription_id } = validateIdParamsSchema.parse(request.params);

    try {
        const useCase = makeGetPrescriptionUseCase();
        const prescriptionData = await useCase.execute(prescription_id);

        if (!prescriptionData) {
            return reply.code(404).send({ message: 'Prescription not found' });
        }

        const pdfBuffer = await generatePrescriptionPDF(prescriptionData);

        reply.header('Content-Type', 'application/pdf');
        reply.header('Content-Disposition', 'inline; filename=prescription.pdf');

        return reply.send(pdfBuffer);
    } catch (error) {
        console.error('Erro ao obter a prescrição ou gerar o PDF:', error);
        return reply.code(500).send({ message: 'Erro interno do servidor' });
    }
}
