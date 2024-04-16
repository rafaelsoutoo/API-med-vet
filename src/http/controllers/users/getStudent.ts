import { FastifyRequest, FastifyReply } from "fastify";
import { GetAllStudentsUseCase, GetStudentByIdUseCase } from "@/use-cases/getStudent";
import { PrismaUsersRepository } from "@/repositories/Prisma/prisma-users-repository";

interface Params {
  id: string;
}

export async function getAllStudent(request: FastifyRequest, reply: FastifyReply) {
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getUsersUseCase = new GetAllStudentsUseCase(prismaUsersRepository);

    const users = await getUsersUseCase.execute();

    if (users.length === 0) {
      return reply.status(200).send({ message: "No Students." });
    }
    return reply.status(200).send(users);
  } catch (error) {
    return reply.status(500).send();
  }
}

export async function getStudentById(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getStudentByIdUseCase = new GetStudentByIdUseCase(prismaUsersRepository);

    const { id } = request.params;

    const user = await getStudentByIdUseCase.execute(id);

    if (!user) {
      return reply.status(404).send({ message: "Student not found." });
    }

    return reply.status(200).send(user);
  } catch (error) {
    return reply.status(500).send();
  }
}
