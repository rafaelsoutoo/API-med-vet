import { PrismaAnimalsRepository } from '@/repositories/Prisma/prisma-animals-repository';
import { PrismaTutorsRepository } from '@/repositories/Prisma/prisma-tutors-repository'
import { DeleteTutorUseCase } from '@/use-cases/tutor/deleteTutor'

export function MakeDeleteTutorUseCase() {
  const tutorsRepository = new PrismaTutorsRepository()
  const animalsRepository = new PrismaAnimalsRepository()
  const useCase = new  DeleteTutorUseCase(tutorsRepository, animalsRepository)

  return useCase
}
