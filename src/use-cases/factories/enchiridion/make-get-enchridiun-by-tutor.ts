import { PrismaEnchiridionRepository } from '@/repositories/Prisma/prisma-enchiridion-repository'  
import { PrismaAnimalsRepository} from '@/repositories/Prisma/prisma-animals-repository'    
import { PrismaTutorsRepository} from '@/repositories/Prisma/prisma-tutors-repository'    
import { getTutorIdEnchiridionUseCase} from '@/use-cases/enchiridion/getEnchiridion'

export function makegetTutorIdEnchiridionUseCase() {
  const enchiridionRepository = new PrismaEnchiridionRepository() //istanciar meu repositório
  const animalsRepository = new PrismaAnimalsRepository() //istanciar meu repositório
  const tutorRepository = new PrismaTutorsRepository() //istanciar meu repositório
  const useCase = new  getTutorIdEnchiridionUseCase(enchiridionRepository, tutorRepository ,  animalsRepository )

  return useCase
}