import { Prisma, Tutor} from '@prisma/client'

export interface TutorRepository {
  findById(id: string): Promise<Tutor | null>
  findByCpfTutor(cpf: string): Promise<Tutor | null>
  findByPhoneTutor(phone: string): Promise<Tutor | null>
  createTutor(data: Prisma.TutorCreateInput): Promise<Tutor>
  getAllTutors(page: number, numberOfItems:number): Promise<Tutor[]>
  findByNameTutor(name: string): Promise<Tutor | null>
  searchManyPhone(query: string, page: number): Promise<Tutor[]>
}
