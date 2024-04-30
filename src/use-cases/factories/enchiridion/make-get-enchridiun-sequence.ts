import { PrismaEnchiridionRepository } from '@/repositories/Prisma/prisma-enchiridion-repository'        
import {GetSequenceByEnchiridionUseCase} from '@/use-cases/enchiridion/getEnchiridion'

export function makegetSequenceEnchiridionUseCase() {
  const enchiridionRepository = new PrismaEnchiridionRepository() //istanciar meu repositório
  const useCase = new GetSequenceByEnchiridionUseCase(enchiridionRepository )

  return useCase
}