import {ConsultsRepository } from '@/repositories/consult-repository'
import { TutorRepository } from '@/repositories/tutors-repository';
import { TutorNoExistsError } from './errors/tutor-no-already-exists';

import { Consult } from '@prisma/client'  //tipagem propria do prisma


interface RegisterUseCaseRequest {
    nameAnimal: string
    date : string
    species : string
    phone: string
    description: string | null
    tutor_id: string
}

interface RegisterUseCaseResponse {
  consults: Consult
}



export class CreateExistTutorConsultsUseCase {  //cada classe tem um método
  constructor(private consultsRepository: ConsultsRepository,
    private tutorRepository: TutorRepository) {}   //receber as dependencia dentro do construtor
                                                                    //retorna isso
  async execute({ nameAnimal, date, description, species, phone, tutor_id}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {


    const tutorWithSameId = await this.tutorRepository.findById(tutor_id);

    if (!tutorWithSameId) {
          throw new TutorNoExistsError()
          };

                     //recebendo repositorio do construtor
    const consults = await this.consultsRepository.createConsults({   //cria o usuario no banco de dados
      nameAnimal,
      date,
      description, 
      species, 
      phone,
      tutor_id
    })

    return {
      consults
    }


  }
}
