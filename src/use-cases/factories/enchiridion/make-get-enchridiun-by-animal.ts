import { PrismaEnchiridionRepository } from '@/repositories/Prisma/prisma-enchiridion-repository'  
import { PrismaAnimalsRepository} from '@/repositories/Prisma/prisma-animals-repository'       
import { getAnimalIdEnchiridionUseCase} from '@/use-cases/enchiridion/getEnchiridion'

export function makegetAnimalIdEnchiridionUseCase() {
  const enchiridionRepository = new PrismaEnchiridionRepository() //istanciar meu repositório
  const animalsRepository = new PrismaAnimalsRepository() //istanciar meu repositório
  const useCase = new  getAnimalIdEnchiridionUseCase(enchiridionRepository,  animalsRepository )

  return useCase
}