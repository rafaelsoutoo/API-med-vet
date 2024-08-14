import { PrismaEnchiridionRepository } from '@/repositories/Prisma/prisma-enchiridion-repository'  
import { PrismaWeightRepository } from '@/repositories/Prisma/prisma-weight-repository'
import { UpdateEnchiridionUseCase} from '@/use-cases/enchiridion/updateEnchiridion'


export function makeUpdateUseCase() {
  const enchiridionRepository = new PrismaEnchiridionRepository() 
  const weightRepository = new PrismaWeightRepository
  const useCase = new  UpdateEnchiridionUseCase(enchiridionRepository, weightRepository)

  return useCase
}