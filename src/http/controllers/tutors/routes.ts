import { createTutor } from '@/http/controllers/tutors/createTutor'
import { getAllTutors } from '@/http/controllers/tutors/getAllTutors'
import { searchPhoneTutors } from '@/http/controllers/tutors/getPhoneTutors'

import { FastifyInstance } from 'fastify'

export async function tutorRoutes(app: FastifyInstance) {
    app.post('/tutor', createTutor)
    app.get('/tutor', getAllTutors)
    app.get('/tutor/searchphone', searchPhoneTutors)
}

