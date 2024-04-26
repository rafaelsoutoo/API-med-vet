import { Prisma, Consult } from '@prisma/client'


export interface ConsultsRepository {
  createConsults(data: Prisma.ConsultUncheckedCreateInput): Promise<Consult>
  getAllConsultsDone(): Promise<Consult[]>
  findBySequence(sequence: string): Promise<Consult | null>
  findById(id: string):Promise<Consult | null>
  deleteConsult(id: string): any
}