import { PrescriptionRepository } from "@/repositories/prescription-repository";
import { MedicationRepository } from "@/repositories/medication-repository";
import { PrescriptionNoExist } from "../errors/prescription-errors";

export class GetPrescriptionByIdUseCase {
    constructor(
        private prescriptionRepository: PrescriptionRepository,
        private medicationRepository: MedicationRepository
    ) {}

    async execute(id: string){
        const prescription = await this.prescriptionRepository.findPrescriptionById(id);
        if (!prescription) {
            throw new PrescriptionNoExist()
        }

        const medications = await this.medicationRepository.findMedicationsByPrescriptionId(id);

        return { ...prescription, medications };
    }
}
