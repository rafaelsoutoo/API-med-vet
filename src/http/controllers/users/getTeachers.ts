import { FastifyRequest, FastifyReply } from "fastify";
import { GetAllTeachersUseCase, GetTeacherByIdUseCase, GetTeachersByRegistrationUseCase } from "@/use-cases/getTeachers";
import { PrismaUsersRepository } from "@/repositories/Prisma/prisma-users-repository";
import { z } from "zod";

interface Params {
  id: string;
  registration: string;
}

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

export async function getTeacherById(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getTeacherByIdUseCase = new GetTeacherByIdUseCase(prismaUsersRepository);

    const { id } = request.params;

    const user = await getTeacherByIdUseCase.execute(id);

    if (!user) {
      return reply.status(404).send({ message: "Teacher not found." });
    }

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined
      }
    });
  } catch (error) {
    return reply.status(500).send();
  }
}

export async function getTeachersByRegistration(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getTeacherByRegistrationUseCase = new GetTeachersByRegistrationUseCase(prismaUsersRepository);

    const { registration } = request.params;

    const user = await getTeacherByRegistrationUseCase.execute(registration);

    if (!user) {
      return reply.status(404).send({ message: "Teachers not found." });
    }

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined
      }
    });
  } catch (error) {
    return reply.status(500).send();
  }
}

