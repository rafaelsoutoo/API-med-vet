import { prisma } from "@/lib/prisma";
import { WeightRepository } from "../weight-repository"; 

export class PrismaWeightRepository implements WeightRepository{
    async createWeight(data: { weight: number, animal_id: string, enchiridion_id: string }) {
        const weight = await prisma.weight.create({
            data: {
                weight: data.weight,
                animal_id: data.animal_id,
                enchiridion_id: data.enchiridion_id,
            },
        })

        return weight
    }

    async  findByEnchiridionIds(enchiridionIds: string[]) {
        const enchiridions = await prisma.weight.findMany({
          where: {
            enchiridion_id: {
              in: enchiridionIds,
            },
          },
        })
    
        return enchiridions
      }
}