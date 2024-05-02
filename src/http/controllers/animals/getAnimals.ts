import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaAnimalsRepository } from "@/repositories/Prisma/prisma-animals-repository";
import { GetAllAnimalsUseCase, GetAnimalById, GetAnimalByTutorUseCase } from "@/use-cases/animal/getAnimals";
import { z } from "zod";
import { AnimalNoexists } from "@/use-cases/errors/animal-errors";
import { makeGetAnimalId } from "@/use-cases/factories/animals/make-get-animal-id";
import { makeGetByTutorAnimalUseCase } from "@/use-cases/factories/animals/make-get-by-tutor-animal";
import { TutorNotExistsError } from "@/use-cases/errors/tutor-error";



interface Params {
    id: string;
}


export async function getAllAnimals(request: FastifyRequest, reply: FastifyReply) {
    const getQuerySchema = z.object({
        page: z.coerce.number(),
        numberOfItems: z.coerce.number()
    });
    const { page, numberOfItems } = getQuerySchema.parse(request.query);

    try {
        const prismaAnimalsRepository = new PrismaAnimalsRepository()
        const getAnimalsUseCase = new GetAllAnimalsUseCase(prismaAnimalsRepository)

        const users = await getAnimalsUseCase.execute(page, numberOfItems)

        return reply.status(200).send(users)
    } catch (error) {
        if (error instanceof AnimalNoexists) {
            return reply.status(404).send({ message: error.message })
        }
    }
}


export async function getAnimalById(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    const { id } = request.params
    const getAnimalByIdUseCase = makeGetAnimalId()

    try {
        const user = await getAnimalByIdUseCase.execute(id)

        return reply.status(200).send(user)

    } catch (err) {
        if (err instanceof AnimalNoexists) {
            return reply.status(404).send({ message: err.message })
        }
        throw err
    }

export async function getAnimalsByTutor(request: FastifyRequest, reply: FastifyReply) {
    const getQuerySchema = z.object({
        tutor_id: z.string()
    });

    const { tutor_id } = getQuerySchema.parse(request.params)

    try {
        const getusecase = makeGetByTutorAnimalUseCase()

        const animals = await getusecase.execute(tutor_id)

        return reply.status(200).send(animals)
    } catch (error) {
        if (error instanceof TutorNotExistsError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}