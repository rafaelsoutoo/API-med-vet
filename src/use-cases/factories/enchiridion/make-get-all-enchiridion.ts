import { PrismaEnchiridionRepository } from '@/repositories/Prisma/prisma-enchiridion-repository'      
import {getAllEnchiridionUseCase} from '@/use-cases/enchiridion/getEnchiridion'

export function makegetAllEnchiridionUseCase() {
  const enchiridionRepository = new PrismaEnchiridionRepository() //istanciar meu repositório
  const useCase = new  getAllEnchiridionUseCase(enchiridionRepository )

  return useCase
}