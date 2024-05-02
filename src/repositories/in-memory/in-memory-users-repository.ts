import { Prisma, Secretary, Student, Teacher } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import {UsersRepository} from '@/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
    public students: Student[] = []
    public teachers: Teacher[] = []
    public secretarys: Secretary[] = []

    // Implementação para o modelo Student
    async findStudentById(id: string) {
        return this.students.find((item) => item.id === id) ?? null
    }

    async findByRegistrationStudent(registration: string) {
        return this.students.find((item) => item.registration === registration) ?? null
    }

    async findAllStudent(page: number, numberOfItems: number) {
        return this.students.slice((page - 1) * numberOfItems, page * numberOfItems)
    }

    async findByCpfStudent(cpf: string) {
        return this.students.find((item) => item.cpf === cpf) ?? null
    }

    async createStudent(data: Prisma.StudentCreateInput) {
        const student = {
            id: randomUUID(),
            name: data.name,
            cpf: data.cpf,
            password_hash: data.password_hash,
            email: data.email ?? null,
            registration: data.registration,
            course: data.course ?? null,
            shift: data.shift ?? null,
            period: data.period ?? null,
            phone: data.phone ?? null,
            role: data.role ?? 'STUDENT',
            created_at: new Date(),
        }

        this.students.push(student)

        return student
    }

    async updateStudent(id: string, data: Prisma.StudentUpdateInput) {
        const studentIndex = this.students.findIndex((item) => item.id === id)
    
        if (studentIndex === -1) {
            throw new Error('Student not found')
        }
    
        const student = {
            ...this.students[studentIndex],
            ...data,
        }
    
        this.students[studentIndex] = student
    
        return student
    }

    async deleteStudent(id: string) {
        const studentIndex = this.students.findIndex((item) => item.id === id)
        if (studentIndex === -1) throw new Error('Student not found')

        this.students.splice(studentIndex, 1)
    }

    //teacher

    async findTeacherById(id: string) {
        return this.teachers.find((item) => item.id === id) ?? null
    }
    
    async findByRegistrationTeachers(registration: string) {
        return this.teachers.find((item) => item.registration === registration) ?? null
    }
    
    async findAllTeachers(page: number, numberOfItems: number) {
        return this.teachers.slice((page - 1) * numberOfItems, page * numberOfItems)
    }
    
    async findByCpfTeacher(cpf: string) {
        return this.teachers.find((item) => item.cpf === cpf) ?? null
    }
    
    async createTeachers(data: Prisma.TeacherCreateInput) {
        const teacher = {
            id: randomUUID(),
            name: data.name,
            cpf: data.cpf,
            password_hash: data.password_hash,
            email: data.email ?? null,
            registration: data.registration,
            course: data.course ?? null,
            shift: data.shift ?? null,
            phone: data.phone ?? null,
            role: data.role ?? 'TEACHER',
            created_at: new Date(),
            enchiridion: data.enchiridion ?? [],
        }
    
        this.teachers.push(teacher)
    
        return teacher
    }
    
    async updateTeacher(id: string, data: Prisma.TeacherUpdateInput) {
        const teacherIndex = this.teachers.findIndex((item) => item.id === id)
        if (teacherIndex === -1) throw new Error('Teacher not found')
    
        const updatedTeacher = { ...this.teachers[teacherIndex], ...data }
        this.teachers[teacherIndex] = updatedTeacher
    
        return updatedTeacher
    }
    
    async deleteTeacher(id: string) {
        const teacherIndex = this.teachers.findIndex((item) => item.id === id)
        if (teacherIndex === -1) throw new Error('Teacher not found')
    
        this.teachers.splice(teacherIndex, 1)
    }
    
    async findTeacherByName(query: string, page: number) {
        const filteredTeachers = this.teachers.filter((item) => item.name.includes(query))
        return filteredTeachers.slice((page - 1) * 10, page * 10)
    }


   //secretary
   async createSecretarys(data: Prisma.SecretaryCreateInput): Promise<Secretary> {
    const secretary = {
        id: randomUUID(),
        name: data.name,
        cpf: data.cpf,
        password_hash: data.password_hash,
        email: data.email ?? null,
        phone: data.phone ?? null,
        role: data.role ?? 'SECRETARY',
        created_at: new Date(),
    }

    this.secretarys.push(secretary)

    return secretary
}

async findSecretaryById(id: string): Promise<Secretary | null> {
    return this.secretarys.find((item) => item.id === id) ?? null
}

async findByCpfSecretary(cpf: string): Promise<Secretary | null> {
    return this.secretarys.find((item) => item.cpf === cpf) ?? null
}

async updateSecretary(id: string, data: Prisma.SecretaryUpdateInput): Promise<Secretary> {
    const index = this.secretarys.findIndex((item) => item.id === id)
    if (index === -1) {
        throw new Error('Secretary not found')
    }

    this.secretarys[index] = { ...this.secretarys[index], ...data }

    return this.secretarys[index]
}

async deleteSecretary(id: string): Promise<void> {
    const index = this.secretarys.findIndex((item) => item.id === id)
    if (index === -1) {
        throw new Error('Secretary not found')
    }

    this.secretarys.splice(index, 1)
}
}