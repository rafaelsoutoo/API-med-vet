import { TutorRepository } from '@/repositories/tutors-repository'
import { Tutor } from '@prisma/client'
import { getAllTutorsError } from '../errors/tutor-error'

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

    if (tutors.length === 0) {
      throw new getAllTutorsError()
    }

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

    if (query.length === 0 || tutors === null || tutors.length === 0) {
      throw new getAllTutorsError()
    }

    return {
      tutors,
    }
  }
}

export class SearchTutorByNameUseCase {
  constructor(private tutorsRepository: TutorRepository) { }

  async execute({
    query,
    page,
  }: SearchTutorUseCaseRequest): Promise<SearchTutorsUseCaseResponse> {
    const tutors = await this.tutorsRepository.searchByNameTutor(query, page)

    if (query.length === 0 || tutors === null || tutors.length === 0) {
      throw new getAllTutorsError()
    }

    return {
      tutors,
    }
  }
}