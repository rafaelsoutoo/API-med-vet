import { Prisma, Secretary, Student, Teacher } from '@prisma/client'

export interface UsersRepository {
  //teacher
  findTeacherById(id: string): Promise<Teacher | null>
  findByRegistrationTeachers(registration: string): Promise<Teacher | null>
  findAllTeachers(page: number, numberOfItems: number): Promise<Teacher[]>;
  findByCpfTeacher(cpf: string): Promise<Teacher | null>
  createTeachers(data: Prisma.TeacherCreateInput): Promise<Teacher>
  updateTeacher(id: string, data: Prisma.TeacherUpdateInput): Promise<Teacher>
  deleteTeacher(id: string): any
  findTeacherByName(query: string, page: number): Promise<Teacher[]>
  
  //student
  findStudentById(id: string): Promise<Student | null>
  findByRegistrationStudent(registration: string): Promise<Student | null>
  findAllStudent(page: number, numberOfItems: number): Promise<Student[]>;
  findByCpfStudent(cpf: string): Promise<Student | null>
  createStudent(data: Prisma.StudentCreateInput): Promise<Student>
  updateStudent(id: string, data: Prisma.StudentUpdateInput): Promise<Student>
  deleteStudent(id: string): any
  
  //secretary
  findSecretaryById(id: string): Promise<Secretary | null>
  findByCpfSecretary(cpf: string): Promise<Secretary | null>
  createSecretarys(data: Prisma.SecretaryCreateInput): Promise<Secretary>
  updateSecretary(id: string, data: Prisma.SecretaryUpdateInput): Promise<Secretary>
  deleteSecretary(id: string): any
}