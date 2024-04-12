import { PrismaTutorsRepository } from './../../repositories/Prisma/prisma-tutors-repository';
import { CreateTutorsUseCase } from '../createTutor';

export function makeRegisterUseCase() {
  const tutorsRepository = new PrismaTutorsRepository() //istanciar meu repositório
  const useCase = new  CreateTutorsUseCase(tutorsRepository)

  return useCase
}