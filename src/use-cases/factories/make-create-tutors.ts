import { PrismaTutorsRepository } from './../../repositories/Prisma/prisma-tutors-repository';
import { PrismaAnimalsRepository } from '@/repositories/Prisma/prisma-animals-repository'
import { CreateTutorsUseCase } from '../createTutor';

export function makeRegisterUseCase() {
  const tutorsRepository = new PrismaTutorsRepository() //istanciar meu repositório
  const aniamalsRepository = new PrismaAnimalsRepository() //istanciar meu repositório
  const useCase = new  CreateTutorsUseCase(tutorsRepository, aniamalsRepository)

  return useCase
}