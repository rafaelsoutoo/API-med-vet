import { TutorAlreadyExistsError } from '../errors/tutorErros';
import { TutorRepository } from '@/repositories/tutors-repository';
import { Tutor } from '@prisma/client'


interface RegisterUseCaseRequest {
    name: string,
    cpf: string | null,
    email: string | null
    phone: string,
}

interface RegisterUseCaseResponse {
  tutor: Tutor
}

export class CreateTutorsUseCase {  //cada classe tem um método
  constructor(
    private tutorRepository: TutorRepository
  ){}

  async execute({ name, email, cpf, phone}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {


  
    if(cpf) {
      var tutorExists = await this.tutorRepository.findByCpfPhone(cpf, phone);
    } else {
      var tutorExists = await this.tutorRepository.findByPhoneTutor(phone)
    }

    if (tutorExists) {
      throw new TutorAlreadyExistsError()
      };

    const tutor = await this.tutorRepository.createTutor({
      name,
      cpf,
      email,
      phone,
    });

    return {
      tutor
    }
  }
}
