import { Prisma, Consult} from '@prisma/client'


export interface ConsultsRepository {
    createConsults(data: Prisma.ConsultUncheckedCreateInput): Promise<Consult>
    getAllConsultsDone(page: number, numberOfItems: number): Promise<Consult[]>
  }