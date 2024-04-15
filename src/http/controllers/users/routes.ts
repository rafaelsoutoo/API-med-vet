import { createStudent } from '@/http/controllers/users/createStudents'
import { createTeacher } from '@/http/controllers/users/createTeachers'
import { createSecretary } from '@/http/controllers/users/createSecretary'
import { authenticate } from '@/http/controllers/users/authenticate'


import { studentSchema } from '@/docs/swagger/studentSchema'
import { teacherSchema} from '@/docs/swagger/teacherSchema'
import { secretarySchema } from '@/docs/swagger/secretarySchema'
import { sessionsSchema} from '@/docs/swagger/sessionsSchema'



import { FastifyInstance } from 'fastify'

export async function  usersRoutes(app: FastifyInstance) {
    app.post('/users/student', { schema: studentSchema }, createStudent)
    
    app.post('/users/teacher', { schema: teacherSchema }, createTeacher )

    app.post('/users/secretary',{ schema: secretarySchema },  createSecretary )

    
    app.post('/sessions',{ schema: sessionsSchema }, authenticate) //seção de autnhenticate

}