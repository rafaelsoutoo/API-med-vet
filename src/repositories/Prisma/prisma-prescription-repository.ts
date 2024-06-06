import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PrescriptionRepository } from "../prescription-repository";

export class PrismaPrescriptionRepository implements PrescriptionRepository {
    
    async createPrescription(data: Prisma.PrescriptionUncheckedCreateInput) {
        const prescription = await prisma.prescription.create({
            data,
        })
        return prescription
    }

    async findPrescriptionById(id: string) {
        const prescription = await prisma.prescription.findUnique({
            where: {
                id,
            },
        })
        return prescription;
    }

}