import { Prisma, Prescription } from "@prisma/client";

export interface PrescriptionRepository {
    createPrescription(data: Prisma.PrescriptionUncheckedCreateInput): Promise<Prescription>
    markAsDelete(id: string): any
    findById(id: string): Promise<Prescription | null>
    findPrescriptionById(id: string): Promise<Prescription | null>
}