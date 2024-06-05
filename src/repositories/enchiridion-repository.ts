import { Prisma, Enchiridion } from '@prisma/client'


export interface EnchiridionRepository {
  sequence(): Promise<string>
  findById(id: string): Promise<Enchiridion | null>
  createEnchiridion(data: Prisma.EnchiridionUncheckedCreateInput): Promise<Enchiridion>
  findByIdAnimalEnchiridion(animalsId: string[]): Promise<Enchiridion[]>
  findByIdUniqueAnimalEnchiridion(animal_id: string): Promise<Enchiridion[]>
  getAllEnchiridion(page: number, numberOfItems: number): Promise<Enchiridion[]>
  findBySequenceEnchiridion(sequence: string): Promise<Enchiridion | null>
  updateEnchiridion(id: string, data: Prisma.EnchiridionUncheckedUpdateInput): Promise<Enchiridion>
}