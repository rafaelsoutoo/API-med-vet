import { TutorRepository } from '@/repositories/tutors-repository';
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'



export class PrismaTutorsRepository implements TutorRepository {

  async findById(id: string) {
    const tutor = await prisma.tutor.findUnique({
      where: {
        id: id,
      },
    })

    return tutor
  }


  async findByCpfTutor(cpf: string) {
    const tutor = await prisma.tutor.findUnique({
      where: {
        cpf,
      },
    })

    return tutor
  }

  async findByPhoneTutor(phone: string) {
    const tutor = await prisma.tutor.findFirst({
      where: {
        phone,
      },
    })

    return tutor
  }

  async searchByNameTutor(query: string, page: number) {
    const queryNormalized = query.toLowerCase();
    // função que busca independente se for lower ou upper
    
    const tutors = await prisma.tutor.findMany({
      where: {
        name: {
          contains: queryNormalized,
          mode: 'insensitive',
        }
      },
      take: 10,
      skip: (page - 1) * 10,
    });

    return tutors;
  }


  async findByPhoneandNameTutor(phone: string, name: string) {
    const tutor = await prisma.tutor.findFirst({
      where: {
        name,
        phone
      },
    })

    return tutor
  }


  async createTutor(data: Prisma.TutorCreateInput) {
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
    const tutors = await prisma.tutor.findMany({
      where: {
        phone: {
          contains: query, //se o titulo contem a query digitada
        },
      },
      take: 5,
      skip: (page - 1) * 5,
    })

    return tutors
  }

  async findByCpfPhone(cpf: string, phone: string) {
    const tutor = await prisma.tutor.findUnique({
      where: {
        cpf: cpf,
        phone: phone
      }
    })

    return tutor
  }

  async updateTutor(id: string, data: Prisma.TutorUpdateInput) {

    const tutorUpdated = await prisma.tutor.update({
      where: {
        id: id
      },
      data
    });

    return tutorUpdated
  }

  async deleteTutor(id: string) {
    await prisma.tutor.delete({
      where: {
        id: id,
      }
    });
  }

  async sequence(): Promise<string> {
    let nextSequence = await prisma.tutor.count() + 1

    let sequenceExists = true;

    while (sequenceExists) {
        const existingSequence = await prisma.tutor.findFirst({
            where: {
                sequence: nextSequence.toString(),
            },
        });

        if (!existingSequence) {
            sequenceExists = false;
        } else {
            nextSequence++;
        }
    }

    return nextSequence.toString();
  }
}
