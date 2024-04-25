import { ConsultsRepository } from '@/repositories/consult-repository'
import { TutorRepository } from '@/repositories/tutors-repository';
import { TutorNotExistsError } from './errors/tutorErrors';

import { Consult } from '@prisma/client'  //tipagem propria do prisma


interface RegisterUseCaseRequest {
  nameAnimal: string
  stringDate: string
  species: string
  phone: string
  description: string | null
  tutor_id: string
}

interface RegisterUseCaseResponse {
  consults: Consult
}



export class CreateExistTutorConsultsUseCase {  //cada classe tem um método
  constructor(private consultsRepository: ConsultsRepository,
    private tutorRepository: TutorRepository) { }   //receber as dependencia dentro do construtor
  //retorna isso
  async execute({ nameAnimal, stringDate, description, species, phone, tutor_id }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {


    const tutorWithSameId = await this.tutorRepository.findById(tutor_id);

    if (!tutorWithSameId) {
      throw new TutorNotExistsError()
    };


    const dateData = (stringDate).split("/");


    const day = parseInt(dateData[0], 10);
    const month = parseInt(dateData[1], 10) - 1;
    const year = parseInt(dateData[2], 10);
    const sequence = "1"

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

      return {
        consults
      }

    } else {
      throw new Error(`data invalida ${day}, ${month}, ${year}`)
    };
  }
}
