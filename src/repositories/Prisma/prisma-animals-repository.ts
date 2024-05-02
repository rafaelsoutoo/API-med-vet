import { AnimalRepository } from '@/repositories/animal-repository';
import { prisma } from '@/lib/prisma'
import { Prisma, Animal } from '@prisma/client'



export class PrismaAnimalsRepository implements AnimalRepository {

  async findById(id: string) {
    const animal = await prisma.animal.findUnique({
      where: {
        id,
      },
    })

    return animal
  }
  async getAllAnimals(page: number, numberOfItems: number) {
    const skipTtens = (page - 1) * numberOfItems

    const animal = await prisma.animal.findMany({
      take: numberOfItems,
      skip: skipTtens,
    })
    const usersWithPasswordHash = animal.map(user => ({
      ...user,
      password_hash: '',
    }))

    return usersWithPasswordHash
  }

  async createAnimal(data: Prisma.AnimalUncheckedCreateInput) {
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

  async findByTutor(id: string) {
      const animal = await prisma.animal.findMany({
        where: {
          tutor_id: id
        },
      });

    return animal
  }
}
