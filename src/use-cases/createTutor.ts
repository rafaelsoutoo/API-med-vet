import { TutorAlreadyExistsError } from './errors/tutor-already-exists';
import { TutorRepository } from '@/repositories/tutors-repository';
import { Tutor } from '@prisma/client'
import { PrismaAnimalsRepository } from '@/repositories/Prisma/prisma-animals-repository'
import { error } from 'console';

interface RegisterUseCaseRequest {
    name: string,
    cpf: string,
    email: string | null
    phone: string,
    animals: string | null
}

interface RegisterUseCaseResponse {
  tutor: Tutor
}



export class CreateTutorsUseCase {  //cada classe tem um método
  constructor(
    private tutorRepository: TutorRepository,
    private animals: PrismaAnimalsRepository
  ){}

  async execute({ name, email, cpf, animals, phone,}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {


    const tutorWithSameCpf = await this.tutorRepository.findByCpfTutor(cpf);

    if (tutorWithSameCpf) {
      throw new TutorAlreadyExistsError()
      };

    const tutor = await this.tutorRepository.createTutor({
      name,
      cpf,
      email,
      phone,
    });

    const tutor_id = tutor.id

   
    if (animals !== null) {
      let name: string = animals;
    
      await this.animals.createAnimal({
        tutor_id,
        name
      });
    } 


    return {
      tutor
    }
  }
}
