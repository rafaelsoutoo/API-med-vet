import { FastifyInstance } from 'fastify';
import { CreateAttchementController } from './createAttachement';

export async function attachmentRoutes(app: FastifyInstance) {
  app.post('/create/attachments', CreateAttchementController);
}