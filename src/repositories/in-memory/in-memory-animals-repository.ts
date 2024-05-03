import { Prisma, Animal } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import {AnimalRepository} from '@/repositories/animal-repository'

export class InMemoryAnimalRepository implements AnimalRepository {
    public items: Animal[] = []

    async createAnimal(data: Prisma.AnimalUncheckedCreateInput): Promise<Animal> {
        const animal = {
            id:  data.id ?? randomUUID(),
            sequence: data.sequence,
            name: data.name,
            created_at: new Date(),
            species: data.species,
            race: data.race ?? null,
            gender: data.gender,
            age: data.age,
            coat: data.coat ?? null,
            tutor_id: data.tutor_id,
            enchiridion: data.enchiridion ?? [],
        }

        this.items.push(animal)

        return animal
    }

    async findById(id: string): Promise<Animal | null> {
        return this.items.find((item) => item.id === id) ?? null
    }

    async findManyIdTutor(tutor_id: string): Promise<Animal[]> {
        return this.items.filter((item) => item.tutor_id === tutor_id)
    }

    async getAllAnimals(page: number, numberOfItems: number): Promise<Animal[]> {
        return this.items.slice((page - 1) * numberOfItems, page * numberOfItems)
    }

    async findByTutor(id: string): Promise<Animal[]> {
        return this.items.filter((item) => item.tutor_id === id)
    }
}