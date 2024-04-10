import { Prisma, Secretary, Student, Teacher} from '@prisma/client'

export interface UsersRepository {
  findById(id: string): Promise<Student | null>
  findByCpfStudent(cpf: string): Promise<Student | null>
  findByCpfTeacher(cpf: string): Promise<Teacher | null>
  createStudent(data: Prisma.StudentCreateInput): Promise<Student>
  createTeachers(data: Prisma.TeacherCreateInput): Promise<Teacher>
}