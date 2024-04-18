import { createConsult } from '@/http/controllers/consults/createConsult'
import { createExistTutorConsultsUseCase } from '@/http/controllers/consults/createExistTutorConsults'
import { FastifyInstance } from 'fastify'
import { getAllConsults } from './getAllConsults'


import { createConsultSchema } from "@/docs/swagger/createConsultSchema";
import { consultsSchema } from "@/docs/swagger/createExistTutorConsultsSchema";

export async function consultRoutes(app: FastifyInstance) {
    app.post('/create/consults',  { schema: createConsultSchema }, createConsult)
    app.get('/get/consults', getAllConsults)
    app.post('/create/:tutor_id/consults', { schema: consultsSchema }, createExistTutorConsultsUseCase)
}

