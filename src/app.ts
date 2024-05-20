import fastify from "fastify";

import fastifyJwt from '@fastify/jwt'


import { ZodError } from 'zod'
import { env } from '@/env'

import { usersRoutes } from '@/http/controllers/users/routes'
import { tutorRoutes } from '@/http/controllers/tutors/routes'
import { consultRoutes } from '@/http/controllers/consults/routes'
import { enchiridionRoutes } from '@/http/controllers/enchiridion/routes'
import { animalsRoutes } from '@/http/controllers/animals/routes'




import { FastifyReply, FastifyRequest } from 'fastify'

import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { prescriptionRoutes } from "./http/controllers/prescription/routes";


export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d', //expiração do token original, 10 min
  },
})




app.register(require('@fastify/swagger'), {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0'
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Development server'
      }
    ],
    tags: [
      { name: 'user', description: 'User related end-points' },
      { name: 'code', description: 'Code related end-points' }
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    }
  }
})




app.register(usersRoutes)
app.register(tutorRoutes)
app.register(consultRoutes)
app.register(enchiridionRoutes)
app.register(animalsRoutes)
app.register(prescriptionRoutes)




app.register(require('@fastify/swagger-ui'), {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request: FastifyRequest, reply: FastifyReply, next: () => void) { next() },
    preHandler: function (request: FastifyRequest, reply: FastifyReply, next: () => void) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header: string) => header,
  transformSpecification: (swaggerObject: string, request: FastifyRequest, reply: FastifyReply) => { return swaggerObject },
  transformSpecificationClone: true
})


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
