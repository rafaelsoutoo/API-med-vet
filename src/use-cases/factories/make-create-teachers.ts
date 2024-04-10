import { PrismaUsersRepository } from '@/repositories/Prisma/prisma-users-repository'  
import { CreateTeachersUseCase } from '@/use-cases/createTeachers'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository() //istanciar meu repositório
  const useCase = new CreateTeachersUseCase(usersRepository)

  return useCase
}