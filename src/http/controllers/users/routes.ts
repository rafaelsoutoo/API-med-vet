import { createStudent } from '@/http/controllers/users/createStudents'
import { createTeacher } from '@/http/controllers/users/createTeachers'
import { FastifyInstance } from 'fastify'

export async function  usersRoutes(app: FastifyInstance) {
    app.post('/users/student', createStudent)

    app.post('/users/teacher', createTeacher )

}