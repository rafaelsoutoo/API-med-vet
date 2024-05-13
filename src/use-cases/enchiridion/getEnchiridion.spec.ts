import { InMemoryEnchiridionRepository } from '@/repositories/in-memory/in-memory-enchiridion-repository'
import { InMemoryAnimalRepository } from '@/repositories/in-memory/in-memory-animals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryTutorRepository } from '@/repositories/in-memory//in-memory-tutor-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { getTutorIdEnchiridionUseCase, getAnimalIdEnchiridionUseCase, getAllEnchiridionUseCase, GetSequenceByEnchiridionUseCase } from '@/use-cases/enchiridion/getEnchiridion'
import {TutorNotExistsError } from '@/use-cases/errors/tutor-error'
import { AnimalNoexists } from '@/use-cases/errors/animal-errors';
import { EnchiridionNotExitsError} from '@/use-cases/errors/enchiridion-errors';



let enchiridionRepository: InMemoryEnchiridionRepository
let animalsRepository: InMemoryAnimalRepository
let usersRepository: InMemoryUsersRepository
let tutorsRepository: InMemoryTutorRepository
let getTeacherIdEnchiridionTest: getTutorIdEnchiridionUseCase
let getAnimalIdEnchiridionTest: getAnimalIdEnchiridionUseCase
let getAllEnchiridionTest: getAllEnchiridionUseCase
let getSequenceByEnchiridionTest: GetSequenceByEnchiridionUseCase



describe('Get the tutor id and return all enchridions', () => {
  beforeEach(() => {
    enchiridionRepository = new InMemoryEnchiridionRepository()
    animalsRepository = new InMemoryAnimalRepository() //istanciar meu repositório
    tutorsRepository = new InMemoryTutorRepository() //istanciar meu repositório
    getTeacherIdEnchiridionTest = new getTutorIdEnchiridionUseCase(enchiridionRepository, tutorsRepository, animalsRepository)


    tutorsRepository.createTutor({
      id: '6616d924ee0af0e50602ca14', // ID do tutor
      sequence: '123',
      name: 'João',
      cpf: '123.456.789-00',
      email: 'joao@example.com',
      phone: '(11) 98765-4321',
      created_at: new Date(),
    })


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


    enchiridionRepository.createEnchiridion({
      animal_id: "66314c11974bd8a7cd2078b7",
      teacher_id: "6616d924ee0af0e50602ca14",
      date:"30/04/2024",
      sequence:"1",
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

  })


  it('get all enchridions ', async () => {


    const { enchiridions } = await getTeacherIdEnchiridionTest.execute({
      tutor_id: "6616d924ee0af0e50602ca14"
    })

    expect(enchiridions).toHaveLength(1)
    expect(enchiridions[0].teacher_id).toBe('6616d924ee0af0e50602ca14');
    expect(enchiridions[0].reason_consult).toBe('Consulta de rotina');

    
  })


  
  it('should throw error TutorNotExistsError', async () => {

    await expect(getTeacherIdEnchiridionTest.execute({
      tutor_id: "662943a6848f68af1540a15f"
    })).rejects.toBeInstanceOf(TutorNotExistsError)
  
  })
})




describe('Get the animal_id and return all enchridions', () => {
  beforeEach(() => {
    enchiridionRepository = new InMemoryEnchiridionRepository()
    animalsRepository = new InMemoryAnimalRepository() //istanciar meu repositório
    tutorsRepository = new InMemoryTutorRepository() //istanciar meu repositório
    getAnimalIdEnchiridionTest = new getAnimalIdEnchiridionUseCase(enchiridionRepository, animalsRepository)



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


    enchiridionRepository.createEnchiridion({
      animal_id: "66314c11974bd8a7cd2078b7",
      teacher_id: "6616d924ee0af0e50602ca14",
      date:"30/04/2024",
      sequence:"1",
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

  })


  it('get all enchridions ', async () => {


    const { enchiridions } = await getAnimalIdEnchiridionTest.execute({
      animal_id: "66314c11974bd8a7cd2078b7"
    })

    expect(enchiridions).toHaveLength(1)
    expect(enchiridions[0].animal_id).toBe('66314c11974bd8a7cd2078b7');
    expect(enchiridions[0].reason_consult).toBe('Consulta de rotina');

    
  })


  
  it('should throw error AnimalNotExistsError', async () => {

    await expect(getAnimalIdEnchiridionTest.execute({
      animal_id: "662943a6848f68af1540a15f"
    })).rejects.toBeInstanceOf(AnimalNoexists)
  
  })
})




describe('Get all enchridions with page and numberOfItems', () => {
  beforeEach(() => {
    enchiridionRepository = new InMemoryEnchiridionRepository()
    getAllEnchiridionTest = new getAllEnchiridionUseCase(enchiridionRepository)


    enchiridionRepository.createEnchiridion({
      animal_id: "66314c11974bd8a7cd2078b7",
      teacher_id: "6616d924ee0af0e50602ca14",
      date:"30/04/2024",
      sequence:"1",
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

    enchiridionRepository.createEnchiridion({
      animal_id: "66314c11974bd8a7cd2078b7",
      teacher_id: "6616d924ee0af0e50602ca14",
      date:"30/04/2024",
      sequence:"2",
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
   
  })


  it('get all enchridions ', async () => {


    const enchiridions  = await getAllEnchiridionTest.execute(1, 2);
    expect(enchiridions).toHaveLength(2)
    expect(enchiridions[0].animal_id).toBe('66314c11974bd8a7cd2078b7');
    expect(enchiridions[0].reason_consult).toBe('Consulta de rotina');

    
  })
})


describe('Get all enchridions with sequence', () => {
  beforeEach(() => {
    enchiridionRepository = new InMemoryEnchiridionRepository()
    getSequenceByEnchiridionTest = new GetSequenceByEnchiridionUseCase(enchiridionRepository)


    enchiridionRepository.createEnchiridion({
      animal_id: "66314c11974bd8a7cd2078b7",
      teacher_id: "6616d924ee0af0e50602ca14",
      date:"30/04/2024",
      sequence:"1",
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

    enchiridionRepository.createEnchiridion({
      animal_id: "66314c11974bd8a7cd2078b7",
      teacher_id: "6616d924ee0af0e50602ca14",
      date:"30/04/2024",
      sequence:"2",
      history: "Rex foi adotado em 2022.",
      reason_consult: "Consulta de rotina 2",
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
   
  })


  it('get all enchridions ', async () => {


    const enchiridions  = await getSequenceByEnchiridionTest.execute("2");
    expect(enchiridions).toEqual(expect.objectContaining({
      id: expect.any(String),
    }));
    expect(enchiridions).toEqual(expect.objectContaining({
      animal_id: '66314c11974bd8a7cd2078b7',
      reason_consult: "Consulta de rotina 2",
    }));

    
  })



  it('should throw error EnchiridionNotExitsError', async () => {

    await expect(getSequenceByEnchiridionTest.execute("3")).rejects.toBeInstanceOf(EnchiridionNotExitsError)
  
  })
})