import { TutorRepository } from '@/repositories/tutors-repository';
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'



export class PrismaTutorsRepository implements TutorRepository {

  async findById(id: string) {
    const tutor = await prisma.tutor.findUnique({ //pelo id retorna o usuário
      where: {
        id,
      },
    })

    return tutor
  }



  async findByCpfTutor(cpf: string) {
    const tutor = await prisma.tutor.findUnique({   // Este comando usa o Prisma para buscar um usuário único no banco de dados onde o campo de e-mail corresponde ao e-mail fornecido.
      where: {
        cpf,
      },
    })

    return tutor
  }


  async createTutor(data: Prisma.TutorCreateInput) {  //cria no banco de dados
    const tutor = await prisma.tutor.create({
      data,
    })

    return tutor
  }

}