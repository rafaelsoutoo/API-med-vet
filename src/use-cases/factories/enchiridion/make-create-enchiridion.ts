import { PrismaEnchiridionRepository } from '@/repositories/Prisma/prisma-enchiridion-repository'  
import { CreateEnchiridionUseCase} from '@/use-cases/enchiridion/createEnchiridion'

export function makeRegisterUseCase() {
  const enchiridionRepository = new PrismaEnchiridionRepository() //istanciar meu repositório
  const useCase = new  CreateEnchiridionUseCase(enchiridionRepository)

  return useCase
}