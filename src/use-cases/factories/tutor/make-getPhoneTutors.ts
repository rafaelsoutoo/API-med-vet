import { SearchPhoneTutorUseCase } from "@/use-cases/tutor/getPhoneTutors"
import { PrismaTutorsRepository } from '@/repositories/Prisma/prisma-tutors-repository'

export function getPhoneTutors() {
  const tutorsRepository = new PrismaTutorsRepository()
  const useCase = new  SearchPhoneTutorUseCase(tutorsRepository)

  return useCase
}
