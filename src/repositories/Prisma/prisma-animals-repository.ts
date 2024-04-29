import { AnimalRepository } from '@/repositories/animal-repository';
import { prisma } from '@/lib/prisma'
import { Prisma, Animal } from '@prisma/client'



export class PrismaAnimalsRepository implements AnimalRepository {

  async findById(id: string) {
    const animal = await prisma.animal.findUnique({ //pelo id retorna o usuário
      where: {
        id,
      },
    })

    return animal
  }

  async createAnimal(data: Prisma.AnimalUncheckedCreateInput) {  //cria no banco de dados
    const animal = await prisma.animal.create({
      data,
    })

    return animal
  }

  async findManyIdTutor(tutor_id: string) {
    
    const allanimals = await prisma.animal.findMany({
      where: {
        tutor_id: tutor_id
      },
    })

    return allanimals
  }


}
