import { Prisma, Prescription } from "@prisma/client";

export interface PrescriptionRepository {
    createPrescription(data: Prisma.PrescriptionUncheckedCreateInput): Promise<Prescription>

}