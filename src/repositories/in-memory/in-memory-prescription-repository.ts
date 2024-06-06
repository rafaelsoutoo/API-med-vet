import { randomUUID } from "crypto";
import { PrescriptionRepository } from "../prescription-repository";
import { Prescription, Prisma } from '@prisma/client';

export class InMemoryPrescriptionRepository implements PrescriptionRepository {
    public items: Prescription[] = []

    async createPrescription(data: Prisma.PrescriptionUncheckedCreateInput): Promise<Prescription> {

        const prescription = {
            id: data.id ?? randomUUID().toString(),
            status_delete: false,
            created_at: new Date(),
            enchiridion_id: data.enchiridion_id
        }

        this.items.push(prescription)

        return prescription
    }

    async markAsDelete(id: string) {
        const index = this.items.findIndex((item) => item.id === id)

        const itemUpdate = {
            ...this.items[index],
            status_delete: true
        }

        this.items.splice(index, 1, itemUpdate)
    }

    async findById(id: string): Promise<Prescription | null> {
        return this.items.find((item) => item.id === id) ?? null
    }

}