import { InMemoryEnchiridionRepository } from '@/repositories/in-memory/in-memory-enchiridion-repository'
import { InMemoryAnimalRepository } from '@/repositories/in-memory/in-memory-animals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateEnchiridionUseCase } from '@/use-cases/enchiridion/createEnchiridion'
import {AnimalNoexists } from '@/use-cases/errors/animal-errors'
import {teacherNoexists } from '@/use-cases/errors/teacher-error'
import {InvalidDateError } from '@/use-cases/errors/invalid-date-error'


let enchiridionRepository: InMemoryEnchiridionRepository
let animalsRepository: InMemoryAnimalRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateEnchiridionUseCase

describe('Create Enchiridion Use Case', () => {
    beforeEach(() => {
        enchiridionRepository = new InMemoryEnchiridionRepository()
        animalsRepository = new InMemoryAnimalRepository() //istanciar meu repositório
        usersRepository = new InMemoryUsersRepository() //istanciar meu repositório
        sut = new CreateEnchiridionUseCase(enchiridionRepository, animalsRepository,  usersRepository)
    })

    it('should to create enchiridion', async () => {

        animalsRepository.items.push({
            id: '66314c11974bd8a7cd2078b7',
            sequence: '123',
            name: 'Rex',
            created_at: new Date(),
            species: 'Cão',
            race: 'Labrador',
            gender: 'Macho',
            age: '5',
            coat: 'Preto',
            tutor_id: '6616d924ee0af0e50602ca14', // ID do tutor
           
          })


        usersRepository.createTeachers({
            id: '6616d924ee0af0e50602ca14', 
            name: 'João',
            cpf: '123.456.789-00',
            password_hash: 'senha_hash',
            email: 'joao@example.com',
            registration: '123456',
            course: 'Veterinária',
            shift: 'Manhã',
            phone: '(11) 12345-6789',
            role: 'TEACHER',
            created_at: new Date(),
          })


        const { enchiridions } = await sut.execute({
            animal_id: "66314c11974bd8a7cd2078b7",
            teacher_id: "6616d924ee0af0e50602ca14",
            stringDate: "30/04/2024",
            history: "Rex foi adotado em 2022.",
            reason_consult: "Consulta de rotina",
            vaccination: "Sim",
            date_vaccination: "24/04/2024",
            deworming: "Não",
            date_deworming: "30/04/2024",
            temperature: "38.5",
            frequency_cardiac: "80",
            frequency_respiratory: "16",
            dehydration: "Não",
            lymph_node: "Não",
            type_mucous: "Normal",
            whats_mucous: "Normal",
            skin_annex: "Normal",
            system_circulatory: "Normal",
            system_respiratory: "Normal",
            system_digestive: "Normal",
            system_locomotor: "Normal",
            system_nervous: "Normal",
            system_genitourinary: "Normal",
            others: "",
            complementary_exams: "Não",
            diagnosis: "Não",
            trataments: "Não",
            observations: "Rex está em boas condições.",
            responsible: "João",
        })

        expect(enchiridions.id).toEqual(expect.any(String))
    })




    it('should throw error AnimalNoexists ', async () => {

        usersRepository.createTeachers({
            id: '6616d924ee0af0e50602ca14', 
            name: 'João',
            cpf: '123.456.789-00',
            password_hash: 'senha_hash',
            email: 'joao@example.com',
            registration: '123456',
            course: 'Veterinária',
            shift: 'Manhã',
            phone: '(11) 12345-6789',
            role: 'TEACHER',
            created_at: new Date(),
          })

          await expect(sut.execute({
            animal_id: "66314c11974bd8a7cd2078b7",
            teacher_id: "6616d924ee0af0e50602ca14",
            stringDate: "30/04/2024",
            history: "Rex foi adotado em 2022.",
            reason_consult: "Consulta de rotina",
            vaccination: "Sim",
            date_vaccination: "24/04/2024",
            deworming: "Não",
            date_deworming: "30/04/2024",
            temperature: "38.5",
            frequency_cardiac: "80",
            frequency_respiratory: "16",
            dehydration: "Não",
            lymph_node: "Não",
            type_mucous: "Normal",
            whats_mucous: "Normal",
            skin_annex: "Normal",
            system_circulatory: "Normal",
            system_respiratory: "Normal",
            system_digestive: "Normal",
            system_locomotor: "Normal",
            system_nervous: "Normal",
            system_genitourinary: "Normal",
            others: "",
            complementary_exams: "Não",
            diagnosis: "Não",
            trataments: "Não",
            observations: "Rex está em boas condições.",
            responsible: "João",
        })).rejects.toBeInstanceOf(AnimalNoexists)

       
    })

    it('should throw error teacherNoexists', async () => {

        animalsRepository.items.push({
            id: '66314c11974bd8a7cd2078b7',
            sequence: '123',
            name: 'Rex',
            created_at: new Date(),
            species: 'Cão',
            race: 'Labrador',
            gender: 'Macho',
            age: '5',
            coat: 'Preto',
            tutor_id: '6616d924ee0af0e50602ca14', // ID do tutor
           
          })

          await expect(sut.execute({
            animal_id: "66314c11974bd8a7cd2078b7",
            teacher_id: "6616d924ee0af0e50602ca14",
            stringDate: "30/04/2024",
            history: "Rex foi adotado em 2022.",
            reason_consult: "Consulta de rotina",
            vaccination: "Sim",
            date_vaccination: "24/04/2024",
            deworming: "Não",
            date_deworming: "30/04/2024",
            temperature: "38.5",
            frequency_cardiac: "80",
            frequency_respiratory: "16",
            dehydration: "Não",
            lymph_node: "Não",
            type_mucous: "Normal",
            whats_mucous: "Normal",
            skin_annex: "Normal",
            system_circulatory: "Normal",
            system_respiratory: "Normal",
            system_digestive: "Normal",
            system_locomotor: "Normal",
            system_nervous: "Normal",
            system_genitourinary: "Normal",
            others: "",
            complementary_exams: "Não",
            diagnosis: "Não",
            trataments: "Não",
            observations: "Rex está em boas condições.",
            responsible: "João",
        })).rejects.toBeInstanceOf(teacherNoexists)  
    })


    it('should throw error InvalidDateError for invalid date', async () => {
      
        animalsRepository.items.push({
            id: '66314c11974bd8a7cd2078b7',
            sequence: '123',
            name: 'Rex',
            created_at: new Date(),
            species: 'Cão',
            race: 'Labrador',
            gender: 'Macho',
            age: '5',
            coat: 'Preto',
            tutor_id: '6616d924ee0af0e50602ca14', // ID do tutor
           
          })


        usersRepository.createTeachers({
            id: '6616d924ee0af0e50602ca14', 
            name: 'João',
            cpf: '123.456.789-00',
            password_hash: 'senha_hash',
            email: 'joao@example.com',
            registration: '123456',
            course: 'Veterinária',
            shift: 'Manhã',
            phone: '(11) 12345-6789',
            role: 'TEACHER',
            created_at: new Date(),
          })
    
        // Fornecer uma data inválida
        const stringDate = "32/56/2024";
    
        await expect(sut.execute({
            animal_id: "66314c11974bd8a7cd2078b7",
            teacher_id: "6616d924ee0af0e50602ca14",
            stringDate: stringDate,
            history: "Rex foi adotado em 2022.",
            reason_consult: "Consulta de rotina",
            vaccination: "Sim",
            date_vaccination: "24/04/2024",
            deworming: "Não",
            date_deworming: "30/04/2024",
            temperature: "38.5",
            frequency_cardiac: "80",
            frequency_respiratory: "16",
            dehydration: "Não",
            lymph_node: "Não",
            type_mucous: "Normal",
            whats_mucous: "Normal",
            skin_annex: "Normal",
            system_circulatory: "Normal",
            system_respiratory: "Normal",
            system_digestive: "Normal",
            system_locomotor: "Normal",
            system_nervous: "Normal",
            system_genitourinary: "Normal",
            others: "",
            complementary_exams: "Não",
            diagnosis: "Não",
            trataments: "Não",
            observations: "Rex está em boas condições.",
            responsible: "João",
        })).rejects.toBeInstanceOf(InvalidDateError)
    })
})
