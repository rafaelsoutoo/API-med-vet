import { prisma } from "@/lib/prisma";

const tableMethods: { [key: string]: any } = {
    consult: prisma.consult,
    enchiridion: prisma.enchiridion,
    tutor: prisma.tutor,
    animal: prisma.animal,

};

export async function Sequence(tableName: string): Promise<string> {
    if (!(tableName in tableMethods)) {
        throw new Error(`Tabela '${tableName}' não é suportada.`);
    }

    const table = tableMethods[tableName]

    let nextSequence = await table.count() + 1;
    let sequenceExists = true;

    while (sequenceExists) {
        const existingSequence = await table.findFirst({
            where: {
                sequence: nextSequence.toString(),
            },
        });

        if (!existingSequence) {
            sequenceExists = false;
        } else {
            nextSequence++;
        }
    }

    return nextSequence.toString();
}
