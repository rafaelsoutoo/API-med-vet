import { CreateAttchementController } from "./createAttachement";
import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer';

const upload = multer(); // Middleware de upload
export async function attachmentRoutes(app: FastifyInstance) {
  app.post(
    '/create/attachments',
    {
      preHandler: upload.single('archive'), 
    },
    CreateAttchementController
  );
}