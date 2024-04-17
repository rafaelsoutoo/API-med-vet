import { ConsultsRepository} from '@/repositories/consult-repository'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'



export class PrismaConsultsRepository implements ConsultsRepository {
  
  async createConsults(data: Prisma.ConsultUncheckedCreateInput) {

    const consult = await prisma.consult.create({
      data,
    })

    return consult
  }

  async getAllConsultsDone(page: number, numberOfItems: number) {
    const skipItens = (page - 1) * numberOfItems
    
    const consults = await prisma.consult.findMany({
      where: {
        done: false
      },
      orderBy: {
        date: 'asc'
      },
      take: numberOfItems,
      skip: skipItens
    })

    return consults
  }


}