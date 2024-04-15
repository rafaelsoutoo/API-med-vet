import { createTutor } from '@/http/controllers/tutors/createTutor'


import { FastifyInstance } from 'fastify'

export async function  tutorRoutes(app: FastifyInstance) {
    app.post('/tutor', createTutor)
}