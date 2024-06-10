import { makePdfPrescriptionUseCase } from "@/use-cases/factories/prescription/make-pdf-prescription";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { generatePrescriptionPDF } from "@/service/generatePrescriptionPDF";
import { PrescriptionNoExist } from "@/use-cases/errors/prescription-errors";
import { makeGetPrescriptionByAnimalIdUseCase } from "@/use-cases/factories/prescription/make-get-prescription-animalID";
import { AnimalNoexists } from "@/use-cases/errors/animal-errors";

export async function PDFPrescriptionById(request: FastifyRequest, reply: FastifyReply) {
    const validateIdParamsSchema = z.object({
        prescription_id: z.string(),
    });

    const { prescription_id } = validateIdParamsSchema.parse(request.params);

    try {
        const useCase = makePdfPrescriptionUseCase();
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

export async function getPrescriptionByAnimalId(request: FastifyRequest, reply: FastifyReply) {
    const validateIdParamsSchema = z.object({
        animal_id: z.string(),
    });
    
    const { animal_id } = validateIdParamsSchema.parse(request.params);

    try {
        const getPrescriptionByAnimalIdUseCase = makeGetPrescriptionByAnimalIdUseCase();

        const data = await getPrescriptionByAnimalIdUseCase.execute(animal_id);

        return reply.send(data);

    } catch (err) {
        if (err instanceof AnimalNoexists) {
            return reply.status(409).send({ message: err.message });
        }

        throw err;
    }
}