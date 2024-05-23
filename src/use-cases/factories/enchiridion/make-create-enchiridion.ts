import { VaccinationRepository } from '@/repositories/vaccination-repository';
import { PrismaEnchiridionRepository } from '@/repositories/Prisma/prisma-enchiridion-repository'  
import { PrismaAnimalsRepository} from '@/repositories/Prisma/prisma-animals-repository'  
import { PrismaUsersRepository} from '@/repositories/Prisma/prisma-users-repository'  
import { CreateEnchiridionUseCase} from '@/use-cases/enchiridion/createEnchiridion'
import { PrismaVaccinationRepository } from '@/repositories/Prisma/prisma-vacination-repository';

export function makeRegisterUseCase() {
  const enchiridionRepository = new PrismaEnchiridionRepository() //istanciar meu repositório
  const animalsRepository = new PrismaAnimalsRepository() //istanciar meu repositório
  const usersRepository = new PrismaUsersRepository() //istanciar meu repositório
  const vaccinationRepository = new PrismaVaccinationRepository()
  const useCase = new  CreateEnchiridionUseCase(enchiridionRepository, animalsRepository,  usersRepository, vaccinationRepository)

  return useCase
}