import { ConsultsRepository } from '@/repositories/consult-repository'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'



export class PrismaConsultsRepository implements ConsultsRepository {

  async findBySequence(sequence: string) {
    const user = await prisma.consult.findUnique({
      where: {
        sequence,
      },
    })

    return user
  }

  async createConsults(data: Prisma.ConsultUncheckedCreateInput) {

    const consult = await prisma.consult.create({
      data,
    })

    return consult
  }

  async getAllConsultsDone() {
    // const skipItens = (page - 1) * numberOfItems

    const consults = await prisma.consult.findMany({
      where: {
        done: false
      },
      orderBy: {
        date: 'desc'
      }
      // take: numberOfItems,
      // skip: skipItens
    })

    return consults
  }

  async findById(id: string) {
    const consult = await prisma.consult.findUnique({
      where: {
        id
      }
    });

    return consult
  }

  async updateConsult(id: string, data: Prisma.ConsultUncheckedUpdateManyInput){
    const consult = await prisma.consult.update({
      where: {
        id: id
      },
      data
    });

    return consult
  }

}