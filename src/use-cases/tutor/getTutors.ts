import { TutorRepository } from '@/repositories/tutors-repository'
import { Tutor } from '@prisma/client'
import { getAllTutorsError } from '../errors/tutor-error'
import { dataGetAll } from '@/@types/tutor-return-type'

//buscar academias pelo nome




export class GetAllTutorsUseCase {
  constructor(private tutorsRepository: TutorRepository) { }

  async execute(page: number, numberOfItems: number): Promise<dataGetAll> {
    const tutors = await this.tutorsRepository.getAllTutors(page, numberOfItems)

    if (tutors.tutor.length === 0) {
      throw new getAllTutorsError()
    }

    return tutors
  };


}

export class SearchPhoneTutorUseCase {
  constructor(private tutorsRepository: TutorRepository) { }

  async execute(
    query: string,
    page: number,
  ): Promise<Tutor[]> {
    const tutors = await this.tutorsRepository.searchManyPhone(query, page)

    if (query.length === 0 || tutors === null || tutors.length === 0) {
      throw new getAllTutorsError()
    }

    return tutors
  }
}

export class SearchTutorByNameUseCase {
  constructor(private tutorsRepository: TutorRepository) { }

  async execute(
    query: string,
    page:number
  ): Promise<Tutor[]> {
    const tutors = await this.tutorsRepository.searchByNameTutor(query, page)

    if (tutors === null || tutors.length === 0) {
      throw new getAllTutorsError()
    }

    return tutors
  }
}