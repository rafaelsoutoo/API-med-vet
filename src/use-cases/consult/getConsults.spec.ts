import { getAllConsultsError } from '@/use-cases/errors/get-all-consults-error';
import { InMemoryConsultsRepository } from "@/repositories/in-memory/in-memory-consults-repository"
import { InMemoryTutorRepository } from "@/repositories/in-memory/in-memory-tutor-repository"
import { GetAllConsultsUseCase, GetConsultBySequenceUseCase } from './getConsults';
import { beforeEach, describe, expect, it } from "vitest";


let consultRepository: InMemoryConsultsRepository
let tutorRepository: InMemoryTutorRepository

let getConsultbyDateTest: GetAllConsultsUseCase
let getConsultBySequenceTest: GetConsultBySequenceUseCase

describe('Getting consults', () => {
    beforeEach(() => {
        consultRepository = new InMemoryConsultsRepository()
        tutorRepository = new InMemoryTutorRepository()  
    
        getConsultbyDateTest = new GetAllConsultsUseCase(consultRepository, tutorRepository)
        getConsultBySequenceTest = new GetConsultBySequenceUseCase(consultRepository)
        
        tutorRepository.createTutor({
                id: "87aba491-3bc5-4428-ba0d-466d74e003af",
                name: "judas",
                cpf: "00538298081",
                email: "email@email.com",
                phone: "(62)91234-4321",
                sequence: "2"
            })
        
        consultRepository.createConsults({
                id: '42',
                sequence: '1',
                date: '01/01/2023',
                nameAnimal: 'tonico',
                phone: '(62)91234-4321',
                species: 'cachorro',
                description: 'Titiozin do meu cora',
                tutor_id: '87aba491-3bc5-4428-ba0d-466d74e003af',
            })
            
        consultRepository.createConsults({
                id: '21',
                sequence: '2',
                date: '01/02/2023',
                nameAnimal: 'tonico',
                phone: '(62)91234-4321',
                species: 'cachorro',
                description: 'Titiozin do meu cora',
                tutor_id: '87aba491-3bc5-4428-ba0d-466d74e003af',
            })
        
        consultRepository.createConsults({
                id: '14',
                sequence: '3',
                date: '01/03/2023',
                nameAnimal: 'tonico',
                phone: '(62)91234-4321',
                species: 'cachorro',
                description: 'Titiozin do meu cora',
                tutor_id: '87aba491-3bc5-4428-ba0d-466d74e003af',
            })
        
            consultRepository.createConsults({
                id: '11',
                sequence: '4',
                date: '01/04/2023',
                nameAnimal: 'tonico',
                phone: '(62)91234-4321',
                species: 'cachorro',
                description: 'Titiozin do meu cora',
                tutor_id: '87aba491-3bc5-4428-ba0d-466d74e003af',
            })
        
            consultRepository.createConsults({
                id: '12',
                sequence: '5',
                date: '01/04/2023',
                nameAnimal: 'joã',
                phone: '(62)91234-4321',
                species: 'cachorro',
                description: 'Titiozin do meu cora',
                tutor_id: '87aba491-3bc5-4428-ba0d-466d74e003af',
            })
    })

    it('getting consults by date', async () => {
        const consults = getConsultbyDateTest.execute()

        expect(consults).toEqual({
            "01012023": [
                {
                    "id": "42",
                    "sequence": "1",
                    "nameTutor": "judas",
                    "nameAnimal": "tonico",
                    "phone": "(62)91234-4321",
                    "species": "cachorro",
                    "description": "Titiozin do meu cora"
                },
            ],
            "01022023": [
                {
                    "id": "21",
                    "sequence": "2",
                    "nameTutor": "judas",
                    "nameAnimal": "tonico",
                    "phone": "(62)91234-4321",
                    "species": "cachorro",
                    "description": "Titiozin do meu cora"
                },
            ],
            "01032023": [
                {
                    "id": "14",
                    "sequence": "3",
                    "nameTutor": "judas",
                    "nameAnimal": "tonico",
                    "phone": "(62)91234-4321",
                    "species": "cachorro",
                    "description": "Titiozin do meu cora"
                },
            ],
            "01042023": [
                {
                    "id": "11",
                    "sequence": "4",
                    "nameTutor": "judas",
                    "nameAnimal": "tonico",
                    "phone": "(62)91234-4321",
                    "species": "cachorro",
                    "description": "Titiozin do meu cora"
                },
                {
                    "id": "12",
                    "sequence": "5",
                    "nameTutor": "judas",
                    "nameAnimal": "tonico",
                    "phone": "(62)91234-4321",
                    "species": "cachorro",
                    "description": "Titiozin do meu cora"
                },
            ],
        })
    })
})