import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { VaccinationRepository } from '../vaccination-repository'

export class PrismaVaccinationRepository implements VaccinationRepository {

  async createVaccination(data: any) {

    const vaccination = await prisma.vaccination.create({
        data,
    })

    return vaccination
  }



  async  findByEnchiridionIds(enchiridionIds: string[]) {
    const enchiridions = await prisma.vaccination.findMany({
      where: {
        enchiridion_id: {
          in: enchiridionIds,
        },
      },
    })

    return enchiridions
  }


  async findByEnchiridionId(enchiridionId: string) {
    const vaccination = await prisma.vaccination.findFirst({
      where: {
        enchiridion_id: enchiridionId,
      },
    })

    return vaccination
  }

}