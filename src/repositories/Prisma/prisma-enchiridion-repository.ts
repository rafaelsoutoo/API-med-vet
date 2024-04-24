import {EnchiridionRepository } from '@/repositories/enchiridion-repository'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'



export class PrismaEnchiridionRepository implements EnchiridionRepository {
  
  async createEnchiridion(data: Prisma.EnchiridionUncheckedCreateInput) {

    const enchiridion = await prisma.enchiridion.create({
      data,
    })

    return enchiridion
  }

 

}