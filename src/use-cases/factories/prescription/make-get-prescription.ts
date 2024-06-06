import { PrismaMedicationRepository } from "@/repositories/Prisma/prisma-medication-repository";
import { PrismaPrescriptionRepository } from "@/repositories/Prisma/prisma-prescription-repository";
import { GetPrescriptionByIdUseCase } from "@/use-cases/prescription/getPrescription";

export function makeGetPrescriptionUseCase() {
    const prescriptionRepository = new PrismaPrescriptionRepository()
    const medicationRepository = new PrismaMedicationRepository();

    const useCase = new GetPrescriptionByIdUseCase(prescriptionRepository, medicationRepository)

    return useCase
}
