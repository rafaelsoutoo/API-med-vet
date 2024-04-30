import { PrismaUsersRepository } from '@/repositories/Prisma/prisma-users-repository'
import { DeleteSecretaryUseCase } from '@/use-cases/users/secretary/deleteSecretary'

export function makeDeleteUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new DeleteSecretaryUseCase(usersRepository)

  return useCase
}