import { Prisma, Animal } from '@prisma/client'

export interface AnimalRepository {
  sequence(): Promise<string>
  findById(id: string): Promise<Animal | null>
  findBySequence(sequence: string): Promise<Animal | null>
  createAnimal(data: Prisma.AnimalUncheckedCreateInput): Promise<Animal>
  findManyIdTutor(tutor_id: string): Promise<Animal[]>
  getAllAnimals(page: number, numberOfItems: number): Promise<Animal[]>
  findByTutor(id: string): Promise<Animal[]>
}