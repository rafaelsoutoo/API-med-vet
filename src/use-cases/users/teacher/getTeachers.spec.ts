import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetAllTeachersUseCase} from '@/use-cases/users/teacher/getTeachers'
import { teacherNoexists } from "@/use-cases/errors/teacher-error";




let usersRepository: InMemoryUsersRepository
let getAllTeachersUseCaseTest: GetAllTeachersUseCase

describe('Get all teachers with page and numberOfItems', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository() //istanciar meu repositório
        getAllTeachersUseCaseTest = new GetAllTeachersUseCase( usersRepository)


        usersRepository.createTeachers({
            id: '6616d924ee0af0e50602ca14', 
            name: 'João',
            cpf: '12345678900',
            password_hash: 'senha_hash',
            email: 'joao@example.com',
            registration: '123456',
            course: 'Veterinária',
            shift: 'Manhã',
            phone: '(11) 12345-6789',
            role: 'TEACHER',
            created_at: new Date(),
          })

        usersRepository.createTeachers({
            id: '5616d924ee0af0e50602ca14', 
            name: 'Felipe',
            cpf: '02336937182',
            password_hash: 'senha_hash',
            email: 'filpstr2784@gmail.com',
            registration: '6436',
            course: 'Veterinária',
            shift: 'Manhã',
            phone: '(64) 12345-6789',
            role: 'TEACHER',
            created_at: new Date(),
          })




    })

    it('should gat all Teacher', async () => {

   
        const users  = await getAllTeachersUseCaseTest.execute(1, 2)

        expect(users).toHaveLength(2)
        expect(users[0].name).toBe('João');
        expect(users[0].cpf).toBe('12345678900');
    })



    it('Shown error User not exist (registration)', async () => {
        await expect(getAllTeachersUseCaseTest.execute(2,2)).rejects.toBeInstanceOf(teacherNoexists)
    })





})
