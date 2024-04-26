import { Prisma, Animal} from '@prisma/client'

export interface AnimalRepository {
  findById(id: string): Promise<Animal | null>
  createAnimal(data: Prisma.AnimalUncheckedCreateInput): Promise<Animal>
  findManyIdTutor(tutor_id: string): Promise<Animal[]>
}
