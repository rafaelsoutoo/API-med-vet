import { FastifyRequest, FastifyReply } from "fastify";
import { GetAllTeachersUseCase } from "@/use-cases/getAllTeachers"; 
import { PrismaUsersRepository } from "@/repositories/Prisma/prisma-users-repository"; 

export async function getAllTeachers(request: FastifyRequest, reply: FastifyReply) {
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getUsersUseCase = new GetAllTeachersUseCase(prismaUsersRepository);

    const users = await getUsersUseCase.execute();

    if (users.length === 0) {
      return reply.status(200).send({ message: "No Teachers." });
    }
    return reply.status(200).send(users);
  } catch (error) {
    return reply.status(500).send();
  }
}
