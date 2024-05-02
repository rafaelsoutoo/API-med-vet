import { PrismaAnimalsRepository } from "@/repositories/Prisma/prisma-animals-repository";
import { GetAnimalById } from "@/use-cases/animal/getAnimals";

export function makeGetAnimalId() {
    const prismaAnimalsRepository = new PrismaAnimalsRepository()
    const useCase = new GetAnimalById(prismaAnimalsRepository)

    return useCase
}

