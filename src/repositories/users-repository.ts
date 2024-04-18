import { Prisma, Secretary, Student, Teacher } from '@prisma/client'

export interface UsersRepository {
  findById(id: string): Promise<Student | null>
  findTeacherById(id: string): Promise<Teacher | null>
  findByRegistrationStudent(registration: string): Promise<Student | null>
  findByRegistrationTeachers(registration: string): Promise<Teacher | null>
  findAllStudent(page: number, numberOfItems: number): Promise<Student[]>;
  findAllTeachers(page: number, numberOfItems: number): Promise<Teacher[]>;
  findByCpfStudent(cpf: string): Promise<Student | null>
  findByCpfTeacher(cpf: string): Promise<Teacher | null>
  findByCpfSecretary(cpf: string): Promise<Secretary | null>
  createStudent(data: Prisma.StudentCreateInput): Promise<Student>
  createTeachers(data: Prisma.TeacherCreateInput): Promise<Teacher>
  createSecretarys(data: Prisma.SecretaryCreateInput): Promise<Secretary>
}