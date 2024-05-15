import { TutorNotExistsError } from '../errors/tutor-error'
import { TutorRepository } from '@/repositories/tutors-repository'
import { AnimalRepository } from '@/repositories/animal-repository'
import { AnimalExist } from '../errors/animal-errors'

interface DeleteUseCaseRequest {
  id: string
}

export class DeleteTutorUseCase {

  constructor(
    private tutorRepository: TutorRepository,
    private animalRepository: AnimalRepository
  ) { }

  async execute({ id }: DeleteUseCaseRequest) {

    const tutorExists = await this.tutorRepository.findById(id)
    const animalsExists = await this.animalRepository.findByTutor(id)

    if (animalsExists) {
      throw new AnimalExist()
    }
    if (!tutorExists) {
      throw new TutorNotExistsError()
    }

    await this.tutorRepository.deleteTutor(id)

  }
}