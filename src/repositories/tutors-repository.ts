import { Prisma, Tutor } from '@prisma/client'

export interface TutorRepository {
  sequence(): Promise<string>
  createTutor(data: Prisma.TutorCreateInput): Promise<Tutor>

  findById(id: string): Promise<Tutor | null>
  findByCpfTutor(cpf: string): Promise<Tutor | null>
  findByPhoneTutor(phone: string): Promise<Tutor | null>
  findByPhoneandNameTutor(phone: string, name: string): Promise<Tutor | null>
  findByCpfPhone(cpf: string, phone: string): Promise<Tutor | null>

  searchByNameTutor(query: string, page: number): Promise<Tutor[]>
  searchManyPhone(query: string, page: number): Promise<Tutor[]>

  getAllTutors(page: number, numberOfItems: number): Promise<Tutor[]>

  updateTutor(id: string, data: Prisma.TutorUpdateInput): Promise<Tutor>

  deleteTutor(id: string): any
}
