import { Prisma, Secretary, Student, Teacher } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UsersRepository } from '@/repositories/users-repository'

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
            id: data.id ?? randomUUID(),
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
        student.password_hash = typeof student.password_hash === 'string' ? student.password_hash : student.password_hash?.set || this.students[studentIndex].password_hash;
        student.email = typeof student.email === 'string' ? student.email : student.email?.set || this.students[studentIndex].email;
        student.registration = typeof student.registration === 'string' ? student.registration : student.registration?.set || this.students[studentIndex].registration;
        student.course = typeof student.course === 'string' ? student.course : student.course?.set || this.students[studentIndex].course;
        student.shift = typeof student.shift === 'string' ? student.shift : student.shift?.set || this.students[studentIndex].shift;
        student.phone = typeof student.phone === 'string' ? student.phone : student.phone?.set || this.students[studentIndex].phone;
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
            id: data.id ?? randomUUID(),
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
        teacher.cpf = typeof teacher.cpf === 'string' ? teacher.cpf : teacher.cpf?.set || this.teachers[teacherIndex].cpf;
        teacher.password_hash = typeof teacher.password_hash === 'string' ? teacher.password_hash : teacher.password_hash?.set || this.teachers[teacherIndex].password_hash;
        teacher.email = typeof teacher.email === 'string' ? teacher.email : teacher.email?.set || this.teachers[teacherIndex].email;
        teacher.registration = typeof teacher.registration === 'string' ? teacher.registration : teacher.registration?.set || this.teachers[teacherIndex].registration;
        teacher.course = typeof teacher.course === 'string' ? teacher.course : teacher.course?.set || this.teachers[teacherIndex].course;
        teacher.shift = typeof teacher.shift === 'string' ? teacher.shift : teacher.shift?.set || this.teachers[teacherIndex].shift;
        teacher.phone = typeof teacher.phone === 'string' ? teacher.phone : teacher.phone?.set || this.teachers[teacherIndex].phone;
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
            id: data.id ?? randomUUID(),
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

        secretary.name = typeof secretary.name === 'string' ? secretary.name : secretary.name?.set || this.secretarys[secretaryIndex].name;
        secretary.cpf = typeof secretary.cpf === 'string' ? secretary.cpf : secretary.cpf?.set || this.secretarys[secretaryIndex].cpf;
        secretary.password_hash = typeof secretary.password_hash === 'string' ? secretary.password_hash : secretary.password_hash?.set || this.secretarys[secretaryIndex].password_hash;
        secretary.email = typeof secretary.email === 'string' ? secretary.email : secretary.email?.set || this.secretarys[secretaryIndex].email;
        secretary.phone = typeof secretary.phone === 'string' ? secretary.phone : secretary.phone?.set || this.secretarys[secretaryIndex].phone;

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