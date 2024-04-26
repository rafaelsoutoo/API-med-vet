import { PrismaTutorsRepository } from '@/repositories/Prisma/prisma-tutors-repository'
import { SearchTutotByNameUseCase } from '@/use-cases/tutor/getTutors'

export function getNameTutors() {
    const tutorsRepository = new PrismaTutorsRepository()
    const useCase = new SearchTutotByNameUseCase(tutorsRepository)

    return useCase
}
