import { Prisma, Attachment } from '@prisma/client'

export interface AttachementRepository {
  createAttachment(data: Prisma.AttachmentUncheckedCreateInput): Promise<Attachment>;
}
