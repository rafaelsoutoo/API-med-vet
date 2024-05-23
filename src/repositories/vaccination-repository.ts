import { Prisma, Vaccination } from '@prisma/client'

export interface VaccinationRepository {
  createVaccination(data: Prisma.VaccinationUncheckedCreateInput): Promise<Vaccination>
}