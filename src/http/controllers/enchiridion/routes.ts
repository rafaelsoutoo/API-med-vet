
import { createEnchiridion} from '@/http/controllers/enchiridion/createEnchiridion'
import { getEnchiridionByTutor, getEnchiridionByAnimal, getAllEnchiridion} from '@/http/controllers/enchiridion/getEnchiridion'


import { FastifyInstance } from 'fastify'





export async function enchiridionRoutes(app: FastifyInstance) {

    app.post('/create/enchiridion', createEnchiridion)
    app.get('/get/enchiridion/tutor/:tutor_id', getEnchiridionByTutor)
    app.get('/get/enchiridion/animal/:animal_id', getEnchiridionByAnimal)
    app.get('/get/enchiridion', getAllEnchiridion)

  
}
