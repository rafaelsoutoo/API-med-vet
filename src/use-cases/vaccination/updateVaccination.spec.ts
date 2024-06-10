import { InMemoryVaccinationRepository } from '@/repositories/in-memory/in-memory-vaccination-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateVaccinationUseCase } from '@/use-cases/vaccination/updateVaccinations'
import { EnchiridionNotExitsError } from '@/use-cases/errors/enchiridion-errors';




let vaccinationRepository: InMemoryVaccinationRepository
let sut: UpdateVaccinationUseCase

describe('Update Vaccination Use Case', () => {
    beforeEach(() => {
        vaccinationRepository = new InMemoryVaccinationRepository() //istanciar meu repositório
        sut = new UpdateVaccinationUseCase(vaccinationRepository)


        vaccinationRepository.createVaccination({
            id: "66620d56e24364c3957f7a24",
            date: "07/07/2024",
            name: "Raiva",
            enchiridion_id: "24134141414141243"
        })

        vaccinationRepository.createVaccination({
            id: "56620d56e24364c3957f7a25",
            date: "07/07/2024",
            name: "Raiva",
            enchiridion_id: "24134141414141243"
        })


    })

    it('should update Vaccination', async () => {

        const updatedVaccinations = await sut.execute(
            {
                "vaccinations":
                    [
                        {
                            "id": "66620d56e24364c3957f7a24",
                            "date": "12/07/2025",
                            "name": "asdgasfdfadsff"
                        },
                        {
                            "id": "56620d56e24364c3957f7a25",
                            "date": "12/07/2025",
                            "name": "fasdfadsfdaf"
                        }
                    ]

            }
        )
        expect(updatedVaccinations).toBeTypeOf('object');

        updatedVaccinations.forEach(vaccination => {
            expect(vaccination).toContainEqual(['id', 'date', 'name']);
            expect(vaccination.id).toBeTypeOf('string');
            expect(vaccination.date).toBeTypeOf('string');
        });


        // console.log('Updated Vaccinations:', updatedVaccinations);

        // expect(updatedVaccinations[0].id).toBe('66620d56e24364c3957f7a24');
        // expect(updatedVaccinations[0].date).toBe('12/07/2025');
        // expect(updatedVaccinations[0].name).toBe('asdgasfdfadsff');
        // expect(updatedVaccinations[1].id).toBe('56620d56e24364c3957f7a25');
        // expect(updatedVaccinations[1].date).toBe('12/07/2025');
        // expect(updatedVaccinations[1].name).toBe('fasdfadsfdaf');


    })


    // it('Should error', async () => {


    // await expect(sut.execute({
    //     id: "36314c11974bd8a7cd2078b7",
    //     animal_id: "66314c11974bd8a7cd2078b7",
    //     teacher_id: "6616d924ee0af0e50602ca14",
    //     stringDate:"05/06/2024",
    //     weight: 35342.132,
    //     history: "Cavalo de Troia",
    //     reason_consult: "Consulta de rotina 2",
    //     deworming: "Não",
    //     date_deworming: "30/06/2024",
    //     temperature: "38.5",
    //     frequency_cardiac: "80",
    //     frequency_respiratory: "16",
    //     dehydration: "Não",
    //     lymph_node: "Não",
    //     type_mucous: "Normal",
    //     whats_mucous: "Normal",
    //     skin_annex: "Normal",
    //     system_circulatory: "Normal",
    //     system_respiratory: "Normal",
    //     system_digestive: "Normal",
    //     system_locomotor: "Normal",
    //     system_nervous: "Normal",
    //     system_genitourinary: "Normal",
    //     others: "",
    //     complementary_exams: "Não",
    //     diagnosis: "Não",
    //     trataments: "Não",
    //     observations: "Rex está em boas condições."
    // })).rejects.toBeInstanceOf( EnchiridionNotExitsError)

    // })

})