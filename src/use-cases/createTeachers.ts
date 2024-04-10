import { UsersRepository } from '@/repositories/users-repository'

import { Teacher} from '@prisma/client'  //tipagem propria do prisma
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
    name: string;
    cpf: string;
    password: string;
    email: string | null;
    registration: string;
    course: string | null;
    shift: string | null;
    phone: string | null;
}

interface RegisterUseCaseResponse {
  user: Teacher
}



export class CreateTeachersUseCase {  //cada classe tem um método
  constructor(private usersRepository: UsersRepository) {}   //receber as dependencia dentro do construtor
                                                                    //retorna isso
  async execute({ name, email, cpf, password, registration, course, shift, phone}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByCpfTeacher(cpf)

    if (userWithSameEmail) { //se o usuario existe
        throw new UserAlreadyExistsError()
      }
  
   
                     //recebendo repositorio do construtor
    const user = await this.usersRepository.createTeachers({   //cria o usuario no banco de dados
      name,
      email,
      cpf,
      password_hash,
      registration,
      course,
      shift,
      phone
    })

    return {
      user
    }
  }
}