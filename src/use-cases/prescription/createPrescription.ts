import { EnchiridionRepository } from "@/repositories/enchiridion-repository";
import { PrescriptionRepository } from "@/repositories/prescription-repository";
import { Prescription } from "@prisma/client";
import { EnchiridionNotExitsError } from "../errors/enchiridion-errors";
import { MedicationRepository } from "@/repositories/medication-repository";

interface PrescriptionUseCaseRequest {
    enchiridion_id: string;
    medication: string | null | any;
}

interface PrescriptionUseCaseResponse {
    prescription: Prescription;
}

export class CreatePrescriptionUseCase {
    constructor(
        private prescriptionRepository: PrescriptionRepository,
        private enchiridionRepository: EnchiridionRepository,
        private medicationRepository: MedicationRepository
    ) { }

    async execute({
        enchiridion_id,
        medication,
    }: PrescriptionUseCaseRequest): Promise<PrescriptionUseCaseResponse> {

        const enchiridionWithSameID = await this.enchiridionRepository.findById(enchiridion_id);

        if (!enchiridionWithSameID) {
            throw new EnchiridionNotExitsError();
        }

        const prescription = await this.prescriptionRepository.createPrescription({
            enchiridion_id
        });
        if (medication && Array.isArray(medication)) {
            medication.forEach(async (medicate) => {

            })

        }

        return {
            prescription,
        };
    }
}
