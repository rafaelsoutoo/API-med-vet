import { TutorNotExistsError } from '../errors/tutorErros'
import { TutorRepository } from '@/repositories/tutors-repository'

interface DeleteUseCaseRequest {
  id: string
}


export class DeleteTutorUseCase {
  
    constructor(
      private tutorRepository: TutorRepository
      ) { }

  async execute({id}: DeleteUseCaseRequest) {

    
    // const tutorExists = await this.tutorRepository.findById(id)
    

    // if (!tutorExists) { 
    //   throw new TutorNotExistsError()
    // }

    await this.tutorRepository.deleteTutor(id)

  }
}