import {ConsultsRepository } from '@/repositories/consult-repository'
import { TutorRepository } from '@/repositories/tutors-repository';


import { Consult } from '@prisma/client'  //tipagem propria do prisma

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
    nameAnimal: string
    date : string
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
  async execute({ nameAnimal, date, description, species, phone, nameTutor }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

    const name = nameTutor

    const tutor = await this.tutorRepository.createTutor({
        name,
        phone
      });

    const tutor_id = tutor.id

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
