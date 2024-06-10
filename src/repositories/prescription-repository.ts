import { Prisma, Prescription } from "@prisma/client";

export interface PrescriptionRepository {
    createPrescription(data: Prisma.PrescriptionUncheckedCreateInput): Promise<Prescription>
    findPrescriptionById(id: string): Promise<Prescription | null>
    getPrescriptionByAnimalId(animal_id: string): Promise<Prescription[]>

}