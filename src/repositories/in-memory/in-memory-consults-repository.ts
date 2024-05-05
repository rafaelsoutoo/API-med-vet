import { Prisma, Consult } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import {ConsultsRepository} from '@/repositories/consult-repository'

export class InMemoryConsultsRepository implements ConsultsRepository {
    public itens: Consult[] = []

    async findBySequence(sequence: string): Promise<Consult | null> {
        return this.itens.find((item) => item.sequence === sequence)?? null
    }
  
    async createConsults(data: Prisma.ConsultUncheckedCreateInput): Promise<Consult> {
        const consult = {
            id: data.id ?? randomUUID(),
            sequence: data.sequence,
            date: new Date(data.date) ?? new Date(),
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
    
        this.itens.splice(index)
    }
   
  }