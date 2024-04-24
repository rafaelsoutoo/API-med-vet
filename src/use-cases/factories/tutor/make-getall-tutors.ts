import { PrismaTutorsRepository } from '@/repositories/Prisma/prisma-tutors-repository'
import { GetAllTutorsUseCase } from '@/use-cases/tutor/getAllTutors'

export function getAllTutorUseCase() {
  const tutorsRepository = new PrismaTutorsRepository() //istanciar meu repositório
  const useCase = new  GetAllTutorsUseCase(tutorsRepository)

  return useCase
}
