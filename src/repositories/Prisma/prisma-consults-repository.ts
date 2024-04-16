import { ConsultsRepository} from '@/repositories/consult-repository'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'



export class PrismaConsultsRepository implements ConsultsRepository {

   
  async createConsults(data: Prisma.ConsultUncheckedCreateInput) {  //cria no banco de dados
    const user = await prisma.consult.create({
      data,
    })

    return user
  }


}