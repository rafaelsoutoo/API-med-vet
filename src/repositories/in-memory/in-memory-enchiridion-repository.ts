import {EnchiridionRepository} from '@/repositories/enchiridion-repository'
import { Enchiridion, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'



export class InMemoryEnchiridionRepository implements EnchiridionRepository {
    public items: Enchiridion[] = []
  
    
  
  
    async createEnchiridion(data: Prisma.EnchiridionUncheckedCreateInput) {
      const enchiridion = {
        id:  data.id ?? randomUUID(),
        sequence: data.sequence,
        animal_id: data.animal_id,
        teacher_id: data.teacher_id,
        date: data.date ? new Date(data.date) : new Date(),
        history: data.history ?? null,
        reason_consult: data.reason_consult ?? null,
        vaccination: data.vaccination ?? null,
        date_vaccination: data.date_vaccination ?? null,
        deworming: data.deworming ?? null,
        date_deworming: data.date_deworming ?? null,
        temperature: data.temperature ?? null,
        frequency_cardiac: data.frequency_cardiac ?? null,
        frequency_respiratory: data.frequency_respiratory ?? null,
        dehydration: data.dehydration ?? null,
        lymph_node: data.lymph_node ?? null,
        type_mucous: data.type_mucous ?? null,
        whats_mucous: data.whats_mucous ?? null,
        skin_annex: data.skin_annex ?? null,
        system_circulatory: data.system_circulatory ?? null,
        system_respiratory: data.system_respiratory ?? null,
        system_digestive: data.system_digestive ?? null,
        system_locomotor: data.system_locomotor ?? null,
        system_nervous: data.system_nervous ?? null,
        system_genitourinary: data.system_genitourinary ?? null,
        others: data.others ?? null,
        complementary_exams: data.complementary_exams ?? null,
        diagnosis: data.diagnosis ?? null,
        trataments: data.trataments ?? null,
        observations: data.observations ?? null,
        responsible: data.responsible ?? null,
        created_at: new Date(),
        prescription: data.prescription,
      }
  
      this.items.push(enchiridion)
  
      return enchiridion
    }


    async findByIdAnimalEnchiridion(animalsId: string[]) {
        return this.items.filter((item) => animalsId.includes(item.animal_id))
      }
    
      async findByIdUniqueAnimalEnchiridion(animal_id: string): Promise<Enchiridion[]> {
        return this.items.filter((item) => item.animal_id === animal_id)
      }
    
      async getAllEnchiridion(page: number, numberOfItems: number): Promise<Enchiridion[]> {
        return this.items.slice((page - 1) * numberOfItems, page * numberOfItems)
      }
    
      async findBySequenceEnchiridion(sequence: string): Promise<Enchiridion | null> {
        return this.items.find((item) => item.sequence === sequence) ?? null
      }

      async sequence(): Promise<string> {
        // let nextSequence = await prisma.animal.count() + 1
        let nextSequence = this.items.length + 1

        let sequenceExists = true;

        while (sequenceExists) {
            const existingSequence = this.items.find((item) => {
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

