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

}