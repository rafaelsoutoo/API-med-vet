
import { createAnimals} from '@/http/controllers/animals/createAnimals'
import { FastifyInstance } from 'fastify'



export async function animalsRoutes(app: FastifyInstance) {
    app.post('/create/animals/:tutor_id',  createAnimals)
}
