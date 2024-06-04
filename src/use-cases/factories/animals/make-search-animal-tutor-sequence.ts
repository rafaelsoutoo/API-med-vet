import { GetAnimalByNameAndTutorAndSequence } from '@/use-cases/animal/getAnimals';
import { PrismaTutorsRepository } from './../../../repositories/Prisma/prisma-tutors-repository';
import { PrismaAnimalsRepository } from "@/repositories/Prisma/prisma-animals-repository";

export function makeSearchAnimalByTutorBySequnce() {
        const prismaAnimalsRepository = new PrismaAnimalsRepository();
        const tutorRepository = new PrismaTutorsRepository()
        const useCase = new GetAnimalByNameAndTutorAndSequence(prismaAnimalsRepository, tutorRepository);

    
    return useCase
}

