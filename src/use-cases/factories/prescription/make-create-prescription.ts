import { PrismaEnchiridionRepository } from "@/repositories/Prisma/prisma-enchiridion-repository";
import { PrismaMedicationRepository } from "@/repositories/Prisma/prisma-medication-repository";
import { PrismaPrescriptionRepository } from "@/repositories/Prisma/prisma-prescription-repository";
import { CreatePrescriptionUseCase } from "@/use-cases/prescription/createPrescription";

export function makeCreatePrescriptionUseCase() {
    const prescriptionRepository = new PrismaPrescriptionRepository()
    const prismaEnchiridion = new PrismaEnchiridionRepository()
    const medicationRepository = new PrismaMedicationRepository()

    const useCase = new CreatePrescriptionUseCase(prescriptionRepository, prismaEnchiridion, medicationRepository)

    return useCase
}
