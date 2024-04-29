import { createConsult } from '@/http/controllers/consults/createConsult'
import { createExistTutorConsultsUseCase } from '@/http/controllers/consults/createExistTutorConsults'
import { FastifyInstance } from 'fastify'
import { getAllConsults, getConsultBySequnece } from './getConsults'


import { createConsultSchema } from "@/docs/swagger/createConsultSchema";
import { consultsSchema } from "@/docs/swagger/createExistTutorConsultsSchema";
import { updateConsult } from "@/http/controllers/consults/updateConsult";

export async function consultRoutes(app: FastifyInstance) {
    app.post('/create/consults', { schema: createConsultSchema }, createConsult)
    app.post('/create/consults/:tutor_id', { schema: consultsSchema }, createExistTutorConsultsUseCase)

    app.get('/get/consults', getAllConsults)
    app.get('/get/consults/sequence/:sequence', getConsultBySequnece)

    app.put('/put/consults', updateConsult)
}

