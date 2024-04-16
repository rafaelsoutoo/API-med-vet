import { Prisma, Secretary, Student, Teacher} from '@prisma/client'

export interface UsersRepository {
  findById(id: string): Promise<Student | null>
  findAllStudent(): Promise<Student[]>;
  findAllTeachers(): Promise<Teacher[]>;
  findByCpfStudent(cpf: string): Promise<Student | null>
  findByCpfTeacher(cpf: string): Promise<Teacher | null>
  findByCpfSecretary(cpf: string): Promise<Secretary | null>
  createStudent(data: Prisma.StudentCreateInput): Promise<Student>
  createTeachers(data: Prisma.TeacherCreateInput): Promise<Teacher>
  createSecretarys(data: Prisma.SecretaryCreateInput): Promise<Secretary>
}