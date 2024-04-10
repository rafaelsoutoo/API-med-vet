import { createStudent } from '@/http/controllers/users/createStudents'
import { createTeacher } from '@/http/controllers/users/createTeachers'
import { createSecretary } from '@/http/controllers/users/createSecretary'
import { authenticate } from '@/http/controllers/users/authenticate'



import { FastifyInstance } from 'fastify'

export async function  usersRoutes(app: FastifyInstance) {
    app.post('/users/student', createStudent)

    app.post('/users/teacher', createTeacher )

    app.post('/users/secretary', createSecretary )

    app.post('/sessions', authenticate) //seção de autnhenticate

}