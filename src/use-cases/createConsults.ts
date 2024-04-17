import {ConsultsRepository } from '@/repositories/consult-repository'
import { TutorRepository } from '@/repositories/tutors-repository';


import { Consult } from '@prisma/client'  //tipagem propria do prisma
import { TutorAlreadyExistsError } from './errors/tutor-already-exists';
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


    const tutorWithSameCpf = await this.tutorRepository.findByPhoneTutor(phone);

    // if (tutorWithSameCpf) {
    //   throw new TutorAlreadyExistsError()
    //   };

    const tutorWithSameName = await this.tutorRepository.findByNameTutor(name);

    // if (tutorWithSameName) {
    //   throw new TutorAlreadyExistsError()
    //   };


    if (tutorWithSameCpf && tutorWithSameName && tutorWithSameCpf.id === tutorWithSameName.id) {
      throw new TutorAlreadyExistsError()
    }

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
