import fastify from "fastify";


import { ZodError } from 'zod'
import { env } from '@/env'

import { usersRoutes } from '@/http/controllers/users/routes'

export const app = fastify()


app.register(usersRoutes)


app.setErrorHandler((error, _, reply) => {  //função que lida com erros 
    if (error instanceof ZodError) {  //for de erro de validação
      return reply
        .status(400)
        .send({ message: 'Validation error.', issues: error.format() })
    }
  
    if (env.NODE_ENV !== 'production') { 
      console.error(error)
    } else {
      // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
    }
  
    return reply.status(500).send({ message: 'Internal server error.' })
  })