import { PrismaUsersRepository } from '@/repositories/Prisma/prisma-users-repository'
import { DeleteTeacherUseCase } from '@/use-cases/users/teacher/deleteTeacher'

export function makeDeleteUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new DeleteTeacherUseCase(usersRepository)

  return useCase
}