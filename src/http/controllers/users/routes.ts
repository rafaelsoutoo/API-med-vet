import { register } from '@/http/controllers/users/createStudents'
import { FastifyInstance } from 'fastify'

export async function  usersRoutes(app: FastifyInstance) {
    app.post('/users/student', register)

}