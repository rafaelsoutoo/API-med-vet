import { createTutor } from '@/http/controllers/tutors/createTutor'
import { getAllTutors } from '@/http/controllers/tutors/getAllTutors'
import { searchPhoneTutors } from '@/http/controllers/tutors/getPhoneTutors'

import { FastifyInstance } from 'fastify'


import {searchPhoneTutorsSchema} from "@/docs/swagger/getPhoneTutorsSchema";
import {getAllTutorsSchema} from "@/docs/swagger/getAllTutorsSchema";
import {createTutorSchema} from "@/docs/swagger/createTutorSchema";



export async function tutorRoutes(app: FastifyInstance) {
    app.post('/tutor', { schema: createTutorSchema } , createTutor)
    app.get('/tutor', getAllTutors)
    app.get('/tutor/searchphone', { schema: searchPhoneTutorsSchema } ,searchPhoneTutors)
}

