import { prisma } from "@/lib/prisma";
import { MedicationRepository } from "../medication-repository";


export class PrismaMedicationRepository implements MedicationRepository {
    async createMedication(data: any) {
        const medication = await prisma.medication.create({
            data,
        })

        return medication
    }
}