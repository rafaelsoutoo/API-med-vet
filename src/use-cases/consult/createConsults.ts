import { ConsultsRepository } from '@/repositories/consult-repository'
import { TutorRepository } from '@/repositories/tutors-repository';
import { prisma } from '@/lib/prisma';
import { Consult } from '@prisma/client'
import { TutorAlreadyExistsError } from '../errors/tutor-error';
import { InvalidDateError } from '../errors/invalid-date-error';

interface RegisterUseCaseRequest {
  nameAnimal: string
  stringDate: string
  species: string
  phone: string
  description: string | null
  nameTutor: string
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


export class CreateConsultsUseCase { 

  constructor(
    private consultsRepository: ConsultsRepository,
    private tutorRepository: TutorRepository
  ) { }

  async execute({ 
    nameAnimal, 
    stringDate, 
    description, 
    species, 
    phone, 
    nameTutor 
  }: RegisterUseCaseRequest): Promise<Consult> {


    const sequence = await getNextSequence()
    const name = nameTutor


    const tutorWithSamePhoneandName = await this.tutorRepository.findByPhoneandNameTutor(phone, name);

    if (tutorWithSamePhoneandName) {
      throw new TutorAlreadyExistsError()
    };


    const tutor = await this.tutorRepository.createTutor({
      sequence,
      name,
      phone
    });

    const tutor_id = tutor.id

    //transformar string em um Date object
    const dateData = (stringDate).split("/");


    const day = parseInt(dateData[0], 10);
    const month = parseInt(dateData[1], 10) - 1;
    const year = parseInt(dateData[2], 10);

    if (day > 0 && day <= 31 && month >= 0 && month < 12) {

      const date = new Date(year, month, day);

      const consults = await this.consultsRepository.createConsults({
        sequence,
        nameAnimal,
        date,
        description,
        species,
        phone,
        tutor_id
      });

      return consults

    } else {
      throw new InvalidDateError(day, month, year)
    };
  }
}
