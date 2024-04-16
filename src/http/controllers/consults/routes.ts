import { createConsult } from '@/http/controllers/consults/createConsult'


import { FastifyInstance } from 'fastify'

export async function consultRoutes(app: FastifyInstance) {
    app.post('/create/consults', createConsult)
}
