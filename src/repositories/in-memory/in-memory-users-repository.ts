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
    
        // Ensure that the properties are of the correct type
        student.name = typeof student.name === 'string' ? student.name : student.name?.set || this.students[studentIndex].name;
        student.cpf = typeof student.cpf === 'string' ? student.cpf : student.cpf?.set || this.students[studentIndex].cpf;
        // Add similar lines for the other properties
    
        // Cast the student object to the Student type
        this.students[studentIndex] = student as Student
    
        return this.students[studentIndex]
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
            id:  data.id ?? randomUUID(),
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
    
        if (teacherIndex === -1) {
            throw new Error('Teacher not found')
        }
    
        const teacher = {
            ...this.teachers[teacherIndex],
            ...data,
        }
    
        // Ensure that the properties are of the correct type
        teacher.name = typeof teacher.name === 'string' ? teacher.name : teacher.name?.set || this.teachers[teacherIndex].name;
        // Add similar lines for the other properties
    
        // Cast the teacher object to the Teacher type
        this.teachers[teacherIndex] = teacher as Teacher
    
        return this.teachers[teacherIndex]
    }
    
    async findTeacherByName(query: string, page: number) {
        const filteredTeachers = this.teachers.filter((item) => item.name.includes(query))
        return filteredTeachers.slice((page - 1) * 10, page * 10)
    }

    deleteTeacher(id: string): void {
        const teacherIndex = this.teachers.findIndex((item) => item.id === id)
        if (teacherIndex === -1) {
            throw new Error('Teacher not found')
        }
    
        this.teachers.splice(teacherIndex, 1)
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



async updateSecretary(id: string, data: Prisma.SecretaryUpdateInput) {
    const secretaryIndex = this.secretarys.findIndex((item) => item.id === id)

    if (secretaryIndex === -1) {
        throw new Error('Secretary not found')
    }

    const secretary = {
        ...this.secretarys[secretaryIndex],
        ...data,
    }

    // Ensure that the properties are of the correct type
    secretary.name = typeof secretary.name === 'string' ? secretary.name : secretary.name?.set || this.secretarys[secretaryIndex].name;
    // Add similar lines for the other properties

    // Cast the secretary object to the Secretary type
    this.secretarys[secretaryIndex] = secretary as Secretary

    return this.secretarys[secretaryIndex]
}


async deleteSecretary(id: string): Promise<void> {
    const index = this.secretarys.findIndex((item) => item.id === id)
    if (index === -1) {
        throw new Error('Secretary not found')
    }

    this.secretarys.splice(index, 1)
}
}