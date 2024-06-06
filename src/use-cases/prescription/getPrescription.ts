import { PrescriptionRepository } from "@/repositories/prescription-repository";
import { MedicationRepository } from "@/repositories/medication-repository";
import { Prescription, Medication } from "@prisma/client";

interface PrescriptionWithMedications extends Prescription {
    medications: Medication[];
}

export class GetPrescriptionByIdUseCase {
    constructor(
        private prescriptionRepository: PrescriptionRepository,
        private medicationRepository: MedicationRepository
    ) {}

    async execute(id: string): Promise<PrescriptionWithMedications | null> {
        const prescription = await this.prescriptionRepository.findPrescriptionById(id);
        if (!prescription) {
            return null;
        }

        const medications = await this.medicationRepository.findMedicationsByPrescriptionId(id);
        return { ...prescription, medications };
    }
}
