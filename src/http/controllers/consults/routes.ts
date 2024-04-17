import { createConsult } from '@/http/controllers/consults/createConsult'
import { FastifyInstance } from 'fastify'
import { getAllConsults } from './getAllConsults'


export async function consultRoutes(app: FastifyInstance) {
    app.post('/create/consults', createConsult)
    app.get('/get/consults', getAllConsults)
}

