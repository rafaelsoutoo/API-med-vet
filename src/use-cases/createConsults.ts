import {ConsultsRepository } from '@/repositories/consult-repository'
import { TutorRepository } from '@/repositories/tutors-repository';


import { Consult } from '@prisma/client'  //tipagem propria do prisma
import { TutorAlreadyExistsError } from './errors/tutor-already-exists';
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
    nameAnimal: string
    stringDate : string
    species : string
    phone: string
    description: string | null
    nameTutor: string
}

interface RegisterUseCaseResponse {
  consults: Consult
}



export class CreateConsultsUseCase {  //cada classe tem um método
  constructor(private consultsRepository: ConsultsRepository,
    private tutorRepository: TutorRepository ) {}   //receber as dependencia dentro do construtor
                                                                    //retorna isso
  async execute({ nameAnimal, stringDate, description, species, phone, nameTutor }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {


    const name = nameTutor


    const tutorWithSamePhoneandName = await this.tutorRepository.findByPhoneandNameTutor(phone, name);

    if ( tutorWithSamePhoneandName) {
      throw new TutorAlreadyExistsError()
      };

    // const tutorWithSameName = await this.tutorRepository.findByNameTutor(name);

    // // if (tutorWithSameName) {
    // //   throw new TutorAlreadyExistsError()
    // //   };


    // if (tutorWithSamePhone && tutorWithSameName && tutorWithSamePhone.id === tutorWithSameName.id) {
    //   throw new TutorAlreadyExistsError()
    // }

    const tutor = await this.tutorRepository.createTutor({
        name,
        phone
      });

    const tutor_id = tutor.id

    //transformar string em um Date object
    const dateData = (stringDate).split("/");

    
    const day = parseInt(dateData[0], 10);
    const month = parseInt(dateData[1], 10) - 1;
    const year = parseInt(dateData[2], 10);

    if (day > 0 && day <= 31 && month >= 0 && month < 12){

      const date = new Date(year, month, day);

      const consults = await this.consultsRepository.createConsults({
        nameAnimal,
        date,
        description, 
        species, 
        phone,
        tutor_id
      });
  
      return {
        consults
      }
    } else {
      throw new Error(`data invalida ${day}, ${month}, ${year}`)
    };
  }
}
