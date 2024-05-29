import { EnchiridionRepository } from "@/repositories/enchiridion-repository";
import { PrescriptionRepository } from "@/repositories/prescription-repository";
import { Prescription } from "@prisma/client";
import { EnchiridionNotExitsError } from "../errors/enchiridion-errors";
import { MedicationRepository } from "@/repositories/medication-repository";

interface PrescriptionUseCaseRequest {
    enchiridion_id: string;
    medications: string | null | any;
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
        medications,
    }: PrescriptionUseCaseRequest): Promise<PrescriptionUseCaseResponse> {

        const enchiridionWithSameID = await this.enchiridionRepository.findById(enchiridion_id);

        if (!enchiridionWithSameID) {
            throw new EnchiridionNotExitsError();
        }

        const prescription = await this.prescriptionRepository.createPrescription({
            enchiridion_id
        })

        const prescription_id = prescription.id
        if (medications && Array.isArray(medications)) {
            medications.forEach(async (medicate) => {
                const use_type = medicate.use_type
                const pharmacy = medicate.pharmacy
                const unit = medicate.unit
                const measurement = medicate.measurement
                const description = medicate.description

                await this.medicationRepository.createMedication({
                    prescription_id,
                    use_type,
                    pharmacy,
                    unit,
                    measurement,
                    description

                })
            })
        }

        return {
            prescription,
        };
    }
}
