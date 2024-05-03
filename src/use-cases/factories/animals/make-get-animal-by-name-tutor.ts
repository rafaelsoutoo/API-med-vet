import { PrismaAnimalsRepository } from "@/repositories/Prisma/prisma-animals-repository";
import { GetAnimalByNameTutorUseCase } from "@/use-cases/animal/getAnimals";

export function makeGetAnimalByNameTutor() {
    const prismaAnimalsRepository = new PrismaAnimalsRepository()
    const useCase = new GetAnimalByNameTutorUseCase(prismaAnimalsRepository)

    return useCase
}

