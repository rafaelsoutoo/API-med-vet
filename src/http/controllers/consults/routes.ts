import { createConsult } from '@/http/controllers/consults/createConsult'
import { createExistTutorConsultsUseCase } from '@/http/controllers/consults/createExistTutorConsults'


import { FastifyInstance } from 'fastify'

export async function consultRoutes(app: FastifyInstance) {
    app.post('/create/consults', createConsult)

    app.post('/create/:tutor_id/consults', createExistTutorConsultsUseCase)
}
