import { PrismaTutorsRepository } from '@/repositories/Prisma/prisma-tutors-repository'
import { DeleteTutorUseCase } from '@/use-cases/tutor/deleteTutor'

export function MakeDeleteTutorUseCase() {
  const tutorsRepository = new PrismaTutorsRepository()
  const useCase = new  DeleteTutorUseCase(tutorsRepository)

  return useCase
}
