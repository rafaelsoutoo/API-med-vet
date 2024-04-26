
import { createEnchiridion} from '@/http/controllers/enchiridion/createEnchiridion'
import { getEnchilridionByTutor} from '@/http/controllers/enchiridion/getEnchiridion'
import { FastifyInstance } from 'fastify'





export async function enchiridionRoutes(app: FastifyInstance) {

    app.post('/create/enchiridion', createEnchiridion)
    app.get('/get/enchiridion/:tutor_id', getEnchilridionByTutor)

  
}
