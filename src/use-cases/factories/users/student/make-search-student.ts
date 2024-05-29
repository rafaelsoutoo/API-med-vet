import { GetStudentByRegistrationUseCase } from "@/use-cases/users/student/getStudent";
import { PrismaUsersRepository } from "@/repositories/Prisma/prisma-users-repository";

export function searchStudentByRegistration() {
    const studentRpository = new PrismaUsersRepository()
    const useCase = new GetStudentByRegistrationUseCase(studentRpository)

    return useCase
}