import { InMemoryTutorRepository } from "@/repositories/in-memory/in-memory-tutor-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateTutorsUseCase } from "./createTutor";
import { getAllTutorsError, TutorAlreadyExistsError } from "../errors/tutor-error";
import { GetAllTutorsUseCase, SearchPhoneTutorUseCase, SearchTutorByNameUseCase } from "./getTutors";

let tutorRepository: InMemoryTutorRepository

let getAllTutorsTest: GetAllTutorsUseCase
let searchPhoneTutorTest: SearchPhoneTutorUseCase
let searchTutorByNameTest: SearchTutorByNameUseCase


describe('testing the create tutors use case', () => {
    beforeEach(() => {
        tutorRepository = new InMemoryTutorRepository
        getAllTutorsTest = new GetAllTutorsUseCase(tutorRepository)

        tutorRepository.createTutor({
            sequence: '1',
            name: 'jonas', 
            email: 'jonas@email.com', 
            cpf: '02286831068', 
            phone: '62912344321'
        })

        tutorRepository.createTutor({
            sequence: '2',
            name: 'gomes', 
            email: 'gomes@email.com', 
            cpf: '73412780057', 
            phone: '62912342314'
        })

        tutorRepository.createTutor({
            sequence: '3',
            name: 'lopes',
            email: 'lopes@email.com', 
            cpf: '16552030029', 
            phone: '62912341234'
        })
    })

    it('Creating a Tutor with all data', async () => {
        const tutor = await getAllTutorsTest.execute(1, 2)
        const tutor1 = await getAllTutorsTest.execute(2, 2)


        expect(tutor).toHaveLength(2)
        expect(tutor1).toHaveLength(1)
        expect(tutor[0].name).toEqual('jonas')
    })

    
    it('show error getAllTutorsError when have no tutor in page select', async () => {
        await expect(getAllTutorsTest.execute(3, 2)).rejects.toBeInstanceOf(getAllTutorsError)
    })
})

describe('Testing Search the Tutor by the phone', () => {
    beforeEach(() => {
    tutorRepository = new InMemoryTutorRepository
    searchPhoneTutorTest = new SearchPhoneTutorUseCase(tutorRepository)

        tutorRepository.createTutor({
            sequence: '1',
            name: 'jonas', 
            email: 'jonas@email.com', 
            cpf: '02286831068', 
            phone: '629182344321'
        })

        tutorRepository.createTutor({
            sequence: '2',
            name: 'gomes', 
            email: 'gomes@email.com', 
            cpf: '73412780057', 
            phone: '62912342314'
        })

        tutorRepository.createTutor({
            sequence: '3',
            name: 'lopes',
            email: 'lopes@email.com', 
            cpf: '16552030029', 
            phone: '62972341234'
        })
    })
    

    it('Creating a Tutor with all data', async () => {
        const tutor = await searchPhoneTutorTest.execute( '629', 1)
        const tutor1 = await searchPhoneTutorTest.execute('6297', 1)


        expect(tutor).toHaveLength(3)
        expect(tutor1).toHaveLength(1)
        expect(tutor1[0].name).toEqual('lopes')
    })

    
    it('show error getAllTutorsError when have no tutor in page select', async () => {
        await expect(searchPhoneTutorTest.execute( '62512341234', 1)).rejects.toBeInstanceOf(getAllTutorsError)
    })
})

describe('Testing Search the Tutor by the name', () => {
    beforeEach(() => {
    tutorRepository = new InMemoryTutorRepository
    searchTutorByNameTest = new SearchTutorByNameUseCase(tutorRepository)

        tutorRepository.createTutor({
            sequence: '1',
            name: 'jonas', 
            email: 'jonas@email.com', 
            cpf: '02286831068', 
            phone: '629182344321'
        })

        tutorRepository.createTutor({
            sequence: '2',
            name: 'lemos', 
            email: 'gomes@email.com', 
            cpf: '73412780057', 
            phone: '62912342314'
        })

        tutorRepository.createTutor({
            sequence: '3',
            name: 'lopes',
            email: 'lopes@email.com', 
            cpf: '16552030029', 
            phone: '62972341234'
        })
    })
    

    it('Creating a Tutor with all data', async () => {
        const tutor = await searchTutorByNameTest.execute( 'j', 1)
        const tutor1 = await searchTutorByNameTest.execute( 'l', 1)
        const tutor2 = await searchTutorByNameTest.execute( 'lo', 1)


        expect(tutor).toHaveLength(1)
        expect(tutor1).toHaveLength(2)
        expect(tutor2[0].sequence).toEqual('3')
    })
    
    it('show error getAllTutorsError when have no tutor in page select', async () => {
        await expect(searchTutorByNameTest.execute('lo', 2)).rejects.toBeInstanceOf(getAllTutorsError)
    })


    it('show error getAllTutorsError when have no tutor in page select', async () => {
        await expect(searchTutorByNameTest.execute( 'leornado', 1)).rejects.toBeInstanceOf(getAllTutorsError)
    })
})
