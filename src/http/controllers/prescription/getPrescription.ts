import { makeGetPrescriptionUseCase } from "@/use-cases/factories/prescription/make-get-prescription";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { generatePrescriptionPDF } from "@/service/generatePrescriptionPDF"; 

export async function getPrescriptionrById(request: FastifyRequest, reply: FastifyReply) {
    const validateIdParamsSchema = z.object({
        prescription_id: z.string(),
    });

    const { prescription_id } = validateIdParamsSchema.parse(request.params);

    try {
        // Obtém os dados da prescrição usando o caso de uso
        const useCase = makeGetPrescriptionUseCase();
        const prescriptionData = await useCase.execute(prescription_id);

        // Verifica se a prescrição foi encontrada
        if (!prescriptionData) {
            // Se não foi encontrada, envie uma resposta indicando que a prescrição não foi encontrada
            return reply.code(404).send({ message: 'Prescription not found' });
        }

        // Gera o PDF com base nos dados da prescrição
        const pdfBuffer = await generatePrescriptionPDF(prescriptionData);

        // Define os cabeçalhos da resposta
        reply.header('Content-Type', 'application/pdf');
        reply.header('Content-Disposition', 'inline; filename=prescription.pdf');

        // Envie o PDF como resposta
        reply.send(pdfBuffer);
    } catch (error) {
        console.error('Erro ao obter a prescrição ou gerar o PDF:', error);
        throw error;
    }
}
