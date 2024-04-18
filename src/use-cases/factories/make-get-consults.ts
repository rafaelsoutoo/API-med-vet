import { PrismaConsultsRepository } from '@/repositories/Prisma/prisma-consults-repository';
import { GetAllConsultsUseCase } from '../getConsults';

export function getAllConsultsUseCase() {
  const consultsRepository = new PrismaConsultsRepository()
  const useCase = new  GetAllConsultsUseCase(consultsRepository)

  return useCase
}
