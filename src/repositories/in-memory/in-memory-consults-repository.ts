import { Prisma, Consult } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import {ConsultsRepository} from '@/repositories/consult-repository'

export class InMemoryConsultsRepository implements ConsultsRepository {
    public itens: Consult[] = []

    async findBySequence(sequence: string): Promise<Consult | null> {
        return this.itens.find((item) => item.sequence === sequence)?? null
    }
  
    async createConsults(data: Prisma.ConsultUncheckedCreateInput): Promise<Consult> {

        function setTime(dataTime: string) {
            let time: string[] = dataTime.split('/')
            
            let date: string = `${time[2]}, ${time[1]}, ${time[0]}`

            return date
        };

        const dateBr = setTime(data.date.toString())

        const consult = {
            id: data.id ?? randomUUID(),
            sequence: data.sequence,
            date: new Date(dateBr) ?? new Date(),
            nameAnimal: data.nameAnimal,
            phone: data.phone,
            species: data.species,
            description: data.description ?? null,
            done: false,
            tutor_id: data.tutor_id,
            created_at: new Date()
        }
        
        this.itens.push(consult)
            
        return consult
    }
  
    async getAllConsultsDone() {
        return this.itens.filter((item) => item.done === false).sort((a, b) => a.date.getTime() - b.date.getTime())
    }
  
    async findById(id: string): Promise<Consult | null> {
      return this.itens.find((item) => item.id === id) ?? null
    }
  
    async updateConsult(id: string, data: Prisma.ConsultUncheckedCreateInput){
     const index =  this.itens.findIndex((item) => item.id === id)

    const itemUpdate: Consult = {
        id: this.itens[index].id,
        sequence: this.itens[index].sequence,
        date: new Date(),
        nameAnimal: data.nameAnimal,
        phone: data.phone,
        species: data.species,
        description: data.description ?? null,
        done: this.itens[index].done,
        tutor_id: this.itens[index].tutor_id,
        created_at: this.itens[index].created_at
    }
    
    this.itens.splice(index, 1, itemUpdate)

    return this.itens[index]
    }
  
    async deleteConsult(id: string) {
        const index = this.itens.findIndex((item) => item.id === id)
        if (index === -1) {
            throw new Error('Tutor not found')
        }

        this.itens.splice(index, 1)
    }

    async sequence(): Promise<string> {
        // let nextSequence = await prisma.animal.count() + 1
        let nextSequence = this.itens.length + 1

        let sequenceExists = true;

        while (sequenceExists) {
            const existingSequence = this.itens.find((item) => {
                item.sequence == nextSequence.toString()
            });

            if (!existingSequence) {
                sequenceExists = false;
            } else {
                nextSequence++;
            }
        }

        return nextSequence.toString();
    }
  }
