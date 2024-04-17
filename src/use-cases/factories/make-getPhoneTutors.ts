import { PrismaTutorsRepository } from '@/repositories/Prisma/prisma-tutors-repository'
import {SearchPhoneTutorUseCase} from '@/use-cases/getPhoneTutors'

export function getPhoneTutors() {
  const tutorsRepository = new PrismaTutorsRepository() //istanciar meu repositório
  const useCase = new  SearchPhoneTutorUseCase(tutorsRepository)

  return useCase
}
