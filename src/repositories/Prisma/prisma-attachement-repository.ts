import { AttachementRepository } from "../attachement-repository";
import { prisma } from '@/lib/prisma'
import { Attachment, Prisma } from '@prisma/client'

export class PrismaAttachementRepository implements AttachementRepository{
 
    async createAttachment(data: Prisma.AttachmentUncheckedCreateInput): Promise<Attachment> {
        const attachement =  await prisma.attachment.create({
            data
        })
        return attachement
    }

}