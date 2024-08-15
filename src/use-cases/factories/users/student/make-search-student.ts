import { GetStudentByRegistrationUseCase } from "@/use-cases/users/student/getStudent";
import { PrismaUsersRepository } from "@/repositories/Prisma/prisma-users-repository";

export function makeSearchStudentByRegistration() {
    const studentRpository = new PrismaUsersRepository()
    const useCase = new GetStudentByRegistrationUseCase(studentRpository)

    return useCase
}