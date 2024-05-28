import { Prisma, Medication } from "@prisma/client";

export interface MedicationRepository {
    createMedication(data: Prisma.MedicationUncheckedCreateInput): Promise<Medication>
}