import { TutorAlreadyExistsError } from '../errors/tutor-error';
import { TutorRepository } from '@/repositories/tutors-repository';
import { Tutor } from '@prisma/client'
import { Sequence } from '@/utils/sequence';



interface RegisterUseCaseRequest {
  name: string,
  cpf: string | null,
  email: string | null
  phone: string,
}

interface RegisterUseCaseResponse {
  tutor: Tutor
}


export class CreateTutorsUseCase {
  constructor(
    private tutorRepository: TutorRepository
  ) { }

  async execute({ name, email, cpf, phone }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const sequence = await Sequence('tutor');

    if (cpf) {
      var tutorExists = await this.tutorRepository.findByCpfPhone(cpf, phone);
    } else {
      var tutorExists = await this.tutorRepository.findByPhoneTutor(phone)
    }

    if (tutorExists) {
      throw new TutorAlreadyExistsError()
    };

    const tutor = await this.tutorRepository.createTutor({
      sequence,
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
