import { prisma } from "@/lib/prisma";
import { MedicationRepository } from "../medication-repository";


export class PrismaMadicationRepository implements MedicationRepository {
    async createMedication(data: any) {
        const medication = await prisma.medication.create({
            data,
        })

        return medication
    }
}