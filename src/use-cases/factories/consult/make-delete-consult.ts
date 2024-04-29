import { PrismaConsultsRepository } from '@/repositories/Prisma/prisma-consults-repository'
import { DeleteConsultUseCase } from '@/use-cases/consult/deleteConsults'

export function MakeDeleteConsultUseCase() {
  const tutorsRepository = new PrismaConsultsRepository()
  const useCase = new  DeleteConsultUseCase(tutorsRepository)

  return useCase
}
