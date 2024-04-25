import { PrismaEnchiridionRepository } from '@/repositories/Prisma/prisma-enchiridion-repository'  
import { PrismaAnimalsRepository} from '@/repositories/Prisma/prisma-animals-repository'  
import { CreateEnchiridionUseCase} from '@/use-cases/enchiridion/createEnchiridion'

export function makeRegisterUseCase() {
  const enchiridionRepository = new PrismaEnchiridionRepository() //istanciar meu repositório
  const animalsRepository = new PrismaAnimalsRepository() //istanciar meu repositório
  const useCase = new  CreateEnchiridionUseCase(enchiridionRepository, animalsRepository)

  return useCase
}