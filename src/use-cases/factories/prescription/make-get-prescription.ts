import { PrismaPrescriptionRepository } from "@/repositories/Prisma/prisma-prescription-repository";
import { GetPrescriptionByIdUseCase } from "@/use-cases/prescription/getPrescription";

export function makeGetPrescriptionUseCase() {
    const prescriptionRepository = new PrismaPrescriptionRepository()
    
    const useCase = new GetPrescriptionByIdUseCase(prescriptionRepository)

    return useCase
}
