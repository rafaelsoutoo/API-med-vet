import { FastifyRequest, FastifyReply } from "fastify";
import { GetAllStudentsUseCase, GetStudentByIdUseCase, GetStudentByRegistrationUseCase } from "@/use-cases/users/student/getStudent";
import { PrismaUsersRepository } from "@/repositories/Prisma/prisma-users-repository";
import { z } from "zod";
import { NoExistsUsersError } from "@/use-cases/errors/user-error";

interface Params {
  id: string;
  registration: string;
}


export async function getAllStudent(request: FastifyRequest, reply: FastifyReply) {

  const getQuerySchema = z.object({
    page: z.coerce.number(),
    numberOfItems: z.coerce.number()
  });

  const { page, numberOfItems } = getQuerySchema.parse(request.query);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getUsersUseCase = new GetAllStudentsUseCase(prismaUsersRepository);

    const users = await getUsersUseCase.execute(page, numberOfItems);

    return reply.status(200).send(users);
  } catch (error) {
    if (error instanceof NoExistsUsersError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}

export async function getStudentById(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getStudentByIdUseCase = new GetStudentByIdUseCase(prismaUsersRepository);

    const { id } = request.params;

    const user = await getStudentByIdUseCase.execute(id);

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined
      }
    });
  } catch (error) {
    return reply.status(404).send({ message: "Student Not Found" });
  }
}
export async function getStudentByRegistration(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getStudentByRegistrationUseCase = new GetStudentByRegistrationUseCase(prismaUsersRepository);

    const { registration } = request.params;

    const user = await getStudentByRegistrationUseCase.execute(registration);

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined
      }
    });
  } catch (error) {
    return reply.status(404).send({ message: "Student not found." });
  }
}
