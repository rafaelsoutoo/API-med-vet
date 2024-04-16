import { FastifyRequest, FastifyReply } from "fastify";
import { GetAllStudentsUseCase } from "@/use-cases/getAllStudent"; 
import { PrismaUsersRepository } from "@/repositories/Prisma/prisma-users-repository"; 

interface QueryParams {
  name?: string;
}

export async function getAllStudent(request: FastifyRequest<{ Querystring: QueryParams }>, reply: FastifyReply) {
  try {

    const prismaUsersRepository = new PrismaUsersRepository();
    const getUsersUseCase = new GetAllStudentsUseCase(prismaUsersRepository);

    const users = await getUsersUseCase.execute();

    return reply.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return reply.status(500).send({ error: "Failed to fetch users" });
  }
}
