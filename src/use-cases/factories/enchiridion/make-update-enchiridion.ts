import { PrismaEnchiridionRepository } from '@/repositories/Prisma/prisma-enchiridion-repository'  
import { UpdateEnchiridionUseCase} from '@/use-cases/enchiridion/updateEnchiridion'


export function makeUpdateUseCase() {
  const enchiridionRepository = new PrismaEnchiridionRepository() 
  const useCase = new  UpdateEnchiridionUseCase(enchiridionRepository)

  return useCase
}