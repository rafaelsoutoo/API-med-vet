import { Prisma, Student} from '@prisma/client'

export interface UsersRepository {
  findById(id: string): Promise<Student | null>
  findByCpfStudent(email: string): Promise<Student | null>
  createStudent(data: Prisma.StudentCreateInput): Promise<Student>
}