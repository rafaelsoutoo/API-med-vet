import { Prisma, Tutor } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { TutorRepository } from '@/repositories/tutors-repository'

export class InMemoryTutorRepository implements TutorRepository {
    public items: Tutor[] = []

    async createTutor(data: Prisma.TutorCreateInput): Promise<Tutor> {
        const tutor = {
            id: data.id ?? randomUUID(),
            sequence: data.sequence ?? await this.sequence(),
            name: data.name,
            cpf: data.cpf ?? null,
            email: data.email ?? null,
            phone: data.phone,
            created_at: new Date(),
            animals: data.animals ?? [],
            consult: data.consult ?? [],
        }

        this.items.push(tutor)

        return tutor
    }

    async findById(id: string) {
        return this.items.find((item) => item.id === id) ?? null
    }

    async findByCpfTutor(cpf: string) {
        return this.items.find((item) => item.cpf === cpf) ?? null
    }

    async findByPhoneTutor(phone: string) {
        return this.items.find((item) => item.phone === phone) ?? null
    }

    async findByPhoneandNameTutor(phone: string, name: string) {
        return this.items.find((item) => item.phone === phone && item.name === name) ?? null
    }

    async findByCpfPhone(cpf: string, phone: string) {
        return this.items.find((item) => item.cpf === cpf && item.phone === phone) ?? null
    }

    async searchByNameTutor(query: string, page: number) {
        return this.items.filter((item) => item.name.includes(query)).slice((page - 1) * 10, page * 10)
    }

    async searchManyPhone(query: string, page: number) {
        return this.items.filter((item) => item.phone.includes(query)).slice((page - 1) * 10, page * 10)
    }

    async getAllTutors(page: number, numberOfItems: number) {
        return this.items.slice((page - 1) * numberOfItems, page * numberOfItems)
    }

    async updateTutor(id: string, data: Prisma.TutorUpdateInput): Promise<Tutor> {
        const tutorIndex = this.items.findIndex((item) => item.id === id)

        if (tutorIndex === -1) {
            throw new Error('Tutor not found')
        }

        const tutor = {
            ...this.items[tutorIndex],
            ...data,
        }

        // Ensure that the properties are of the correct type
        tutor.name = typeof tutor.name === 'string' ? tutor.name : tutor.name?.set || this.items[tutorIndex].name;
        tutor.cpf = typeof tutor.cpf === 'string' ? tutor.cpf : tutor.cpf?.set || this.items[tutorIndex].cpf;
        tutor.phone = typeof tutor.phone === 'string' ? tutor.phone : tutor.phone?.set || this.items[tutorIndex].phone;

        // Cast the tutor object to the Tutor type
        this.items[tutorIndex] = tutor as Tutor

        return this.items[tutorIndex]
    }

    async deleteTutor(id: string) {
        const index = this.items.findIndex((item) => item.id === id)
        if (index === -1) {
            throw new Error('Tutor not found')
        }

        this.items.splice(index, 1)
    }

    async sequence(): Promise<string> {
        let nextSequence = this.items.length + 1
        let sequenceExists = true

        while (sequenceExists) {
            const existingSequence = this.items.find((item) => item.sequence === nextSequence.toString())

            if (!existingSequence) {
                sequenceExists = false
            } else {
                nextSequence++
            }
        }

        return nextSequence.toString()
    }
}