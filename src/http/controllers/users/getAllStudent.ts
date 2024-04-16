import { FastifyRequest, FastifyReply } from "fastify";
import { GetAllStudentsUseCase } from "@/use-cases/getAllStudent"; 
import { PrismaUsersRepository } from "@/repositories/Prisma/prisma-users-repository"; 

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
