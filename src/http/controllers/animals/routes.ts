
import { createAnimals } from '@/http/controllers/animals/createAnimals'
import { FastifyInstance } from 'fastify'
import { getAllAnimals } from './getAnimals'



export async function animalsRoutes(app: FastifyInstance) {
    app.post('/create/animals/:tutor_id', createAnimals)
    app.get('/get/animals', getAllAnimals)
}
