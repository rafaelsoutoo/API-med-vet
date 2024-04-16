import { Prisma, Tutor} from '@prisma/client'

export interface TutorRepository {
  findById(id: string): Promise<Tutor | null>
  findByCpfTutor(cpf: string): Promise<Tutor | null>
  findByPhoneTutor(phone: string): Promise<Tutor | null>
  createTutor(data: Prisma.TutorCreateInput): Promise<Tutor>
}
