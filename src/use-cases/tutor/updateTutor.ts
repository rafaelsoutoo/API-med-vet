import { Tutor } from '@prisma/client'
import { TutorNotExistsError } from '../errors/tutorErros'
import { TutorRepository } from '@/repositories/tutors-repository'

interface UpdateUseCaseRequest {
  id: string
  name: string
  cpf: string
  email: string | null
  phone: string
}

interface UpdateUseCaseResponse {
  tutor: Tutor
}

export class UpdateTutorUseCase {
  
    constructor(private tutorRepository: TutorRepository) { }

  async execute({id, name, email, cpf, phone }: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {

    
    const tutorExists = await this.tutorRepository.findById(id)
    

    if (tutorExists) { 
        const tutor = await this.tutorRepository.updateTutor(id, {
        name,
        email,
        cpf,
        phone
        })

        return {
         tutor
        }
    } else {
        throw new TutorNotExistsError()
    }
  }
}