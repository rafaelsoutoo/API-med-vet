import { TutorAlreadyExistsError } from './errors/tutor-already-exists';
import { TutorRepository } from '@/repositories/tutors-repository';
import { Tutor } from '@prisma/client'

interface RegisterUseCaseRequest {
    name: string,
    cpf: string,
    email: string,
    phone: string,
	  description: string | null,
	  animals: string | null,
	  consult: string | null,
}

interface RegisterUseCaseResponse {
  tutor: Tutor
}



export class CreateTutorsUseCase {  //cada classe tem um método
  constructor(private tutorRepository: TutorRepository) {}   //receber as dependência dentro do construtor
                                                                    //retorna isso
  async execute({ name, email, cpf, description, animals, consult, phone}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {


    const tutorWithSameCpf = await this.tutorRepository.findByCpfTutor(cpf)

    if (tutorWithSameCpf) { //se o usuário existe
        throw new TutorAlreadyExistsError()
      }
  
  //criar logica para relacionar animal e consultas ao Tutor


                     //recebendo repositório do construtor
    const tutor = await this.tutorRepository.createTutor({   //cria o usuário no banco de dados
      name,
      email,
      cpf,
      email,
      phone,
      description,
      animals,
      consult
    })

    return {
      tutor
    }
  }
}