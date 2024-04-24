
import { createEnchiridion} from '@/http/controllers/enchiridion/createEnchiridion'
import { FastifyInstance } from 'fastify'





export async function enchiridionRoutes(app: FastifyInstance) {

    app.post('/create/enchiridion', createEnchiridion)
  
}
