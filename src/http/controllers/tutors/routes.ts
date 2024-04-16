import { createTutor } from '@/http/controllers/tutors/createTutor'
import { getAllTutors } from '@/http/controllers/tutors/getAllTutors'

import { FastifyInstance } from 'fastify'

export async function  tutorRoutes(app: FastifyInstance) {
    app.post('/tutor', createTutor)
    app.get('/tutor', getAllTutors)
}

