import { PrismaUsersRepository } from '@/repositories/Prisma/prisma-users-repository'  
import { RegisterUseCase } from '@/use-cases/createStudents'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository() //istanciar meu repositório
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}