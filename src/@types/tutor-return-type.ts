import { Tutor } from '@prisma/client'

export type dataGetAll = {
  numberOfPages: number,
  tutor: Tutor[]
}
