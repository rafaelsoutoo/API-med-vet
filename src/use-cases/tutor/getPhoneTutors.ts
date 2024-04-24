import { TutorRepository } from '@/repositories/tutors-repository'
import { Tutor } from '@prisma/client'

//buscar academias pelo nome


interface SearchTutorUseCaseRequest {
  query: string  //a busca pelo nome
  page: number  // listar as buscas
}

interface SearchTutorsUseCaseResponse {
  tutors: Tutor[]
}

export class SearchPhoneTutorUseCase {
  constructor(private tutorsRepository: TutorRepository) {}

  async execute({
    query,
    page,
  }: SearchTutorUseCaseRequest): Promise<SearchTutorsUseCaseResponse> {
    const tutors = await this.tutorsRepository.searchManyPhone(query, page)

    return {
    tutors,
    }
  }
}