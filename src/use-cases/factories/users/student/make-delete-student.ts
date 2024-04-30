import { PrismaUsersRepository } from '@/repositories/Prisma/prisma-users-repository'
import { DeleteStudentUseCase } from '@/use-cases/users/student/deleteStudent'

export function makeDeleteUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new DeleteStudentUseCase(usersRepository)

  return useCase
}