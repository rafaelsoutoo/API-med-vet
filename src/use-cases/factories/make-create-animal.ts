import { PrismaAnimalsRepository } from '@/repositories/Prisma/prisma-animals-repository'
import { CreateAnimalsUseCase } from '@/use-cases/createAnimal'

export function makeRegisterUseCase() {
  const animalRepository = new PrismaAnimalsRepository() //istanciar meu repositório
  const useCase = new  CreateAnimalsUseCase(animalRepository)

  return useCase
}
