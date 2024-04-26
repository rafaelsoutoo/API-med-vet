import { PrismaAnimalsRepository } from '@/repositories/Prisma/prisma-animals-repository'
import { PrismaTutorsRepository } from '@/repositories/Prisma/prisma-tutors-repository'
import {createAnimalsUsecase } from '@/use-cases/animal/createAnimals'

export function makeCreateAnimalUseCase() {
  const animalRepository = new PrismaAnimalsRepository() 
  const prismaTutorsRepository  = new PrismaTutorsRepository () 
  const useCase = new  createAnimalsUsecase(animalRepository, prismaTutorsRepository)

  return useCase
}
