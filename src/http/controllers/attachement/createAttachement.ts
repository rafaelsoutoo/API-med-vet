import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeAttachementUseCase } from '@/use-cases/factories/attachement/make_create_attachement';

export async function CreateAttchementController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    animal_id: z.string(),
  });

  const { animal_id } = registerBodySchema.parse(request.body);

  // Captura o arquivo
  const archive = await request.file();
  if (!archive) {
    return reply.status(400).send({ message: 'Arquivo não enviado' });
  }

  try {
    const attachementUserCase = makeAttachementUseCase();

    const buffer = await archive.toBuffer();

    // Calcula o tamanho do arquivo
    const fileSize = buffer.length;


    // Executa o caso de uso
    const attachment = await attachementUserCase.execute({
      animal_id,
      archive: {
        buffer: await archive.toBuffer(), // Usa o método toBuffer para obter o buffer do arquivo
        mimetype: archive.mimetype,
        originalname: archive.filename, // O nome original do arquivo está em 'filename
      },
    });

    // Responde com sucesso
    return reply.status(201).send(attachment);
  } catch (err) {
    console.error('Erro ao criar anexo:', err);
    return reply.status(500).send({ message: 'Erro interno do servidor' });
  }
}