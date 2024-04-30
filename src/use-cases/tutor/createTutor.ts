import { TutorAlreadyExistsError } from '../errors/tutor-error';
import { TutorRepository } from '@/repositories/tutors-repository';
import { PrismaClient, Tutor } from '@prisma/client'


interface RegisterUseCaseRequest {
  name: string,
  cpf: string | null,
  email: string | null
  phone: string,
}

interface RegisterUseCaseResponse {
  tutor: Tutor
}

const prisma = new PrismaClient();

async function getNextSequence() {
  let nextSequence = await prisma.tutor.count() + 1;
  let sequenceExists = true;

  while (sequenceExists) {
    const existingSequence = await prisma.tutor.findFirst({
      where: {
        sequence: nextSequence.toString(),
      },
    });

    // Se a sequência não existir, sai do loop
    if (!existingSequence) {
      sequenceExists = false;
    } else {
      // Se a sequência existir, incrementa e verifica novamente
      nextSequence++;
    }
  }

  return nextSequence.toString();
}

export class CreateTutorsUseCase {  //cada classe tem um método
  constructor(
    private tutorRepository: TutorRepository
  ) { }

  async execute({ name, email, cpf, phone }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

    const sequence = await getNextSequence()

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
