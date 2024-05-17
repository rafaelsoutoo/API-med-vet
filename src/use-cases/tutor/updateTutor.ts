import { Tutor } from '@prisma/client'
import { TutorNotExistsError } from '../errors/tutor-error'
import { TutorRepository } from '@/repositories/tutors-repository'

interface UpdateUseCaseRequest {
  id: string
  name: string
  cpf: string
  email: string | null
  phone: string
}

export class UpdateTutorUseCase {

  constructor(private tutorRepository: TutorRepository) { }

  async execute({ id, name, email, cpf, phone }: UpdateUseCaseRequest): Promise<Tutor> {

    const tutorExists = await this.tutorRepository.findById(id)

    if (!tutorExists) {
      throw new TutorNotExistsError()
  
    }

    const tutor = await this.tutorRepository.updateTutor(id, {
      name,
      email,
      cpf,
      phone
    })

    return tutor
  }
}