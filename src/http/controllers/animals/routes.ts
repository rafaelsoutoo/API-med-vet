
import { createAnimals } from '@/http/controllers/animals/createAnimals'
import { FastifyInstance } from 'fastify'
import { getAllAnimals, getAnimalById, getAnimalsByTutor, getAnimalBySequence, getAnimalByNameTutor, getAnimalByNameAndTutorAndSequence } from './getAnimals'




export async function animalsRoutes(app: FastifyInstance) {
    app.post('/create/animals/:tutor_id', createAnimals)

    app.get('/get/animals', getAllAnimals)
    app.get('/get/animal/id/:id', getAnimalById)
    app.get('/get/animal/sequence/:sequence', getAnimalBySequence)
    app.get('/get/animals/bytutor/:tutor_id', getAnimalsByTutor)
    app.get('/get/animal/tutor/name/:name', getAnimalByNameTutor)
    app.get('/search/animal',getAnimalByNameAndTutorAndSequence)

}
