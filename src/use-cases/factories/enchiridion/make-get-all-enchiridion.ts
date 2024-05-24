import { PrismaEnchiridionRepository } from '@/repositories/Prisma/prisma-enchiridion-repository'      
import {getAllEnchiridionUseCase} from '@/use-cases/enchiridion/getEnchiridion'
import { PrismaVaccinationRepository} from '@/repositories/Prisma/prisma-vacination-repository'  

export function makegetAllEnchiridionUseCase() {
  const enchiridionRepository = new PrismaEnchiridionRepository() //istanciar meu repositório
  const vaccinationRepository = new PrismaVaccinationRepository() 
  const useCase = new  getAllEnchiridionUseCase(enchiridionRepository, vaccinationRepository )

  return useCase
}