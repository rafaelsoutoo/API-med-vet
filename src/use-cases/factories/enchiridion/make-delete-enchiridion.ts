import { PrismaEnchiridionRepository } from '@/repositories/Prisma/prisma-enchiridion-repository'
import { MakeMarkAsDeleteUseCase } from '@/use-case/enchiridion/deleteEnchiridion'

export function makegetTutorIdEnchiridionUseCase() {
  const enchiridionRepository = new PrismaEnchiridionRepository() //istanciar meu repositório
  const useCase = new  MakeMarkAsDeleteUseCase(enchiridionRepository)

  return useCase
}
