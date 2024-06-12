import { prisma } from '@/lib/prisma'
import { VaccinationRepository } from '../vaccination-repository'
import { Prisma } from '@prisma/client'

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


  async findById(id: string) {
    const vaccination = await prisma.vaccination.findUnique({
      where: {
        id: id,
      },
    })

    return vaccination
  }


  async updateVaccination(id:string, data: Prisma.VaccinationUpdateInput) {

    const vaccination = await prisma.vaccination.update({
      where: {
        id: id
      },
      data
    })

    return vaccination
  }

}