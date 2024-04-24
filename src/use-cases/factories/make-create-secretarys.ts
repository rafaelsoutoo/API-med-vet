import { PrismaUsersRepository } from '@/repositories/Prisma/prisma-users-repository'  
import { CreateSecretarysUseCase} from '@/use-cases/createSecretarys'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new  CreateSecretarysUseCase(usersRepository)

  return useCase
}