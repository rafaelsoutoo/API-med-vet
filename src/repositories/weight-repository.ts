import { Prisma, Weight } from "@prisma/client";

export interface WeightRepository {
    createWeight(data: Prisma.WeightUncheckedCreateInput): Promise<Weight>

}