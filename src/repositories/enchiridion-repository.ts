import { Prisma, Enchiridion} from '@prisma/client'


export interface EnchiridionRepository {
    createEnchiridion(data: Prisma.EnchiridionUncheckedCreateInput): Promise<Enchiridion>
    
  }