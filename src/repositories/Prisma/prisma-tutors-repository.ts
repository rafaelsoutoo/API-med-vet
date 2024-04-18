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

  async findByPhoneTutor(phone: string) {
    const tutor = await prisma.tutor.findFirst({   // Este comando usa o Prisma para buscar um usuário único no banco de dados onde o campo de e-mail corresponde ao e-mail fornecido.
      where: {
        phone,
      },
    })

    return tutor
  }

  async findByNameTutor(name: string) {
    const tutor = await prisma.tutor.findFirst({   // Este comando usa o Prisma para buscar um usuário único no banco de dados onde o campo de e-mail corresponde ao e-mail fornecido.
      where: {
        name,
      },
    })

    return tutor
  }

  async findByPhoneandNameTutor(phone: string ,name: string) {
    const tutor = await prisma.tutor.findFirst({   // Este comando usa o Prisma para buscar um usuário único no banco de dados onde o campo de e-mail corresponde ao e-mail fornecido.
      where: {
        name,
        phone
      },
    })

    return tutor
  }


  async createTutor(data: Prisma.TutorCreateInput) {  //cria no banco de dados
    const tutor = await prisma.tutor.create({
      data,
    });


    return tutor

  }


  async getAllTutors(page: number, numberOfItems: number) {
    const skipItens = (page - 1) * numberOfItems

    const alltutors = await prisma.tutor.findMany({
      take: numberOfItems,
      skip: skipItens
    })

    return alltutors
  }

  async searchManyPhone(query: string, page: number) { //buscar pelo nome e retorna a academia
    const gyms = await prisma.tutor.findMany({
      where: {
        phone: {
          contains: query, //se o titulo contem a query digitada
        },
      },
      take: 5,
      skip: (page - 1) * 5,
    })

    return gyms
  }
}
