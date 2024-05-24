import { PrismaEnchiridionRepository } from '@/repositories/Prisma/prisma-enchiridion-repository'  
import { PrismaAnimalsRepository} from '@/repositories/Prisma/prisma-animals-repository'    
import { PrismaTutorsRepository} from '@/repositories/Prisma/prisma-tutors-repository'    
import { PrismaVaccinationRepository} from '@/repositories/Prisma/prisma-vacination-repository'    
import { getTutorIdEnchiridionUseCase} from '@/use-cases/enchiridion/getEnchiridion'

export function makegetTutorIdEnchiridionUseCase() {
  const enchiridionRepository = new PrismaEnchiridionRepository() //istanciar meu repositório
  const animalsRepository = new PrismaAnimalsRepository() 
  const tutorRepository = new PrismaTutorsRepository() 
  const vaccinationRepository = new PrismaVaccinationRepository() 
  const useCase = new  getTutorIdEnchiridionUseCase(enchiridionRepository, tutorRepository ,  animalsRepository, vaccinationRepository)

  return useCase
}