import { ConsultsRepository } from '@/repositories/consult-repository'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'



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

    const consults = await prisma.consult.findMany({
      where: {
        done: false
      },
      orderBy: {
        date: 'desc'
      }
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

  async updateConsult(id: string, data: Prisma.ConsultUncheckedUpdateManyInput) {
    const consult = await prisma.consult.update({
      where: {
        id: id
      },
      data
    });

    return consult
  }

  async deleteConsult(id: string) {
    await prisma.consult.delete({
      where: {
        id: id
      }
    });
  }

  async sequence(): Promise<string> {
    let nextSequence = await prisma.consult.count() + 1

    let sequenceExists = true;

    while (sequenceExists) {
      const existingSequence = await prisma.consult.findFirst({
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