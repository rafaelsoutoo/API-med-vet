import { TutorRepository } from '@/repositories/tutors-repository'
import { Tutor } from '@prisma/client'

//buscar academias pelo nome


interface SearchTutorUseCaseRequest {
  query: string
  page: number
}

interface SearchTutorsUseCaseResponse {
  tutors: Tutor[]

}



export class GetAllTutorsUseCase {
  constructor(private tutorsRepository: TutorRepository) { }

  async execute(page: number, numberOfItems: number) {
    const tutors = await this.tutorsRepository.getAllTutors(page, numberOfItems)

    return tutors
  };


}

export class SearchPhoneTutorUseCase {
  constructor(private tutorsRepository: TutorRepository) { }

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

export class SearchTutotByNameUseCase {
  constructor(private tutorsRepository: TutorRepository) { }

  async execute({
    query,
    page,
  }: SearchTutorUseCaseRequest): Promise<SearchTutorsUseCaseResponse> {
    const tutors = await this.tutorsRepository.searchByNameTutor(query, page)

    return {
      tutors,
    }
  }
}