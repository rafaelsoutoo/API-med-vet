import { createTutor } from '@/http/controllers/tutors/createTutor'
import { getAllTutors, getTutorByName, searchPhoneTutors } from '@/http/controllers/tutors/getTutors'

import { FastifyInstance } from 'fastify'

import { searchPhoneTutorsSchema } from "@/docs/swagger/getPhoneTutorsSchema";
import { getAllTutorsSchema } from "@/docs/swagger/getAllTutorsSchema";
import { createTutorSchema } from "@/docs/swagger/createTutorSchema";
import { updateTutor } from './updateTutor';
import { deleteTutor } from './deleteTutor';



export async function tutorRoutes(app: FastifyInstance) {
    app.post('/tutor', { schema: createTutorSchema }, createTutor)

    app.get('/get/tutor', { schema: getAllTutorsSchema }, getAllTutors)

    app.get('/get/tutor/name', getTutorByName)

    app.get('/get/tutor/searchphone', { schema: searchPhoneTutorsSchema }, searchPhoneTutors)

    app.put('/put/tutor', updateTutor)

    app.delete('/delete/tutor', deleteTutor)
}


