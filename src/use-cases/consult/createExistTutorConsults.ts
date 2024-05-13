import { ConsultsRepository } from '@/repositories/consult-repository'
import { TutorRepository } from '@/repositories/tutors-repository';
import { TutorNotExistsError } from '../errors/tutor-error';
import { prisma } from '@/lib/prisma';

import { Consult } from '@prisma/client'  //tipagem propria do prisma
import { InvalidDateError } from '../errors/invalid-date-error';


interface RegisterUseCaseRequest {
  nameAnimal: string
  stringDate: string
  species: string
  phone: string
  description: string | null
  tutor_id: string
}


async function getNextSequence() {
  let nextSequence = await prisma.consult.count() + 1;
  let sequenceExists = true;

  while (sequenceExists) {
    const existingSequence = await prisma.consult.findFirst({
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

export class CreateExistTutorConsultsUseCase {  
  constructor(private consultsRepository: ConsultsRepository,
    private tutorRepository: TutorRepository) { }   

  async execute({ nameAnimal, stringDate, description, species, phone, tutor_id }: RegisterUseCaseRequest): Promise<Consult> {


    const tutorWithSameId = await this.tutorRepository.findById(tutor_id);

    if (!tutorWithSameId) {
      throw new TutorNotExistsError()
    };


    const dateData = (stringDate).split("/");


    const day = parseInt(dateData[0], 10);
    const month = parseInt(dateData[1], 10) - 1;
    const year = parseInt(dateData[2], 10);
    const sequence = await getNextSequence()

    if (day > 0 && day <= 31 && month >= 0 && month < 12) {

      const date = new Date(year, month, day);

      //recebendo repositorio do construtor
      const consults = await this.consultsRepository.createConsults({   //cria o usuario no banco de dados
        sequence,
        nameAnimal,
        date,
        description,
        species,
        phone,
        tutor_id
      })

      return consults

    } else {
      throw new InvalidDateError(day, month, year)
    };
  }
}
