import { PrismaTutorsRepository } from '@/repositories/Prisma/prisma-tutors-repository'
import { PrismaAnimalsRepository } from '@/repositories/Prisma/prisma-animals-repository'
import { DeleteTutorUseCase } from '@/use-cases/tutor/deleteTutor'

export function MakeDeleteTutorUseCase() {
  const tutorsRepository = new PrismaTutorsRepository()
  const animalsrepository = new PrismaAnimalsRepository()
  const useCase = new  DeleteTutorUseCase(tutorsRepository, animalsrepository)

  return useCase
}
