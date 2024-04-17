import { FastifyRequest, FastifyReply } from "fastify";
import { GetAllTeachersUseCase } from "@/use-cases/getTeachers";
import { PrismaUsersRepository } from "@/repositories/Prisma/prisma-users-repository";
import { z } from "zod";

export async function getAllTeachers(request: FastifyRequest, reply: FastifyReply) {

  const getQuerySchema = z.object({
    page: z.coerce.number(),
  numberOfItems: z.coerce.number()
  });
  
  const { page, numberOfItems } = getQuerySchema.parse(request.query);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getUsersUseCase = new GetAllTeachersUseCase(prismaUsersRepository);

    const users = await getUsersUseCase.execute(page, numberOfItems);

    if (users.length === 0) {
      return reply.status(200).send({ message: "No Teachers." });
    }
    return reply.status(200).send(users);
  } catch (error) {
    return reply.status(500).send();
  }
}
