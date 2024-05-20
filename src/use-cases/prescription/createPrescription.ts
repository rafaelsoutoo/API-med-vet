import { EnchiridionRepository } from "@/repositories/enchiridion-repository";
import { PrescriptionRepository } from "@/repositories/prescription-repository";
import { Prescription } from "@prisma/client";
import { EnchiridionNotExitsError } from "../errors/enchiridion-errors";

interface PrescriptionUseCaseRequest {
    enchiridion_id: string;
}

interface PrescriptionUseCaseResponse {
    prescription: Prescription;
}

export class CreatePrescriptionUseCase {
    constructor(
        private prescriptionRepository: PrescriptionRepository,
        private enchiridionRepository: EnchiridionRepository
    ) { }

    async execute({
        enchiridion_id,
    }: PrescriptionUseCaseRequest): Promise<PrescriptionUseCaseResponse> {

        const enchiridionWithSameID = await this.enchiridionRepository.findById(enchiridion_id);

        if (!enchiridionWithSameID) {
            throw new EnchiridionNotExitsError();
        }

        const prescription = await this.prescriptionRepository.createPrescription({
            enchiridion_id
        });

        return {
            prescription,
        };
    }
}
