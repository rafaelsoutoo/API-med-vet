import { FastifyRequest, FastifyReply } from "fastify";
import { GetAllTeachersUseCase, GetTeacherByIdUseCase, GetTeachersByRegistrationUseCase } from "@/use-cases/users/teacher/getTeachers";
import { PrismaUsersRepository } from "@/repositories/Prisma/prisma-users-repository";
import { z } from "zod";
import { getNameTeachers } from "@/use-cases/factories/users/teacher/make-get-name-teacher";
import { teacherNoexists } from "@/use-cases/errors/teacher-error";

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

    return reply.status(200).send(users);
  } catch (error) {
    if (error instanceof teacherNoexists) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}

export async function getTeacherById(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getTeacherByIdUseCase = new GetTeacherByIdUseCase(prismaUsersRepository);

    const { id } = request.params;

    const user = await getTeacherByIdUseCase.execute(id);


    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined
      }
    });
  } catch (error) {
    if (error instanceof teacherNoexists) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}

export async function getTeachersByRegistration(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getTeacherByRegistrationUseCase = new GetTeachersByRegistrationUseCase(prismaUsersRepository);

    const { registration } = request.params;

    const user = await getTeacherByRegistrationUseCase.execute(registration);

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined
      }
    });
  } catch (error) {
    if (error instanceof teacherNoexists) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}

export async function getTeacherByName(request: FastifyRequest, reply: FastifyReply) {
  const searchTeacherQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchTeacherQuerySchema.parse(request.query)
  const queryWithoutSpaces = q.replace('-', ' ')
  const searchNameTeacherUseCase = getNameTeachers()
  const teachers = await searchNameTeacherUseCase.execute(queryWithoutSpaces, page)

  return reply.status(200).send({
    teachers,
  })
}

