import { EnchiridionRepository } from '@/repositories/enchiridion-repository'
import { AnimalRepository } from '@/repositories/animal-repository'
import { UsersRepository } from '@/repositories/users-repository'


import { Enchiridion } from '@prisma/client'  //tipagem propria do prisma
import { InvalidDateError } from '@/use-cases/errors/invalid-date-error';
import { AnimalNoexists } from '@/use-cases/errors/animal-errors';
import { teacherNoexists } from '@/use-cases/errors/teacher-error';
import { Sequence } from '@/utils/sequence'

interface EnchiridionUseCaseRequest {
    animal_id: string;
    teacher_id: string;
    stringDate: string;
    history: string | null;
    reason_consult: string | null;
    vaccination: string | null;
    date_vaccination: string | null;
    deworming: string | null;
    date_deworming: string | null;
    temperature: string | null;
    frequency_cardiac: string | null;
    frequency_respiratory: string | null;
    dehydration: string | null;
    lymph_node: string | null;
    type_mucous: string | null;
    whats_mucous: string | null;
    skin_annex: string | null;
    system_circulatory: string | null;
    system_respiratory: string | null;
    system_digestive: string | null;
    system_locomotor: string | null;
    system_nervous: string | null;
    system_genitourinary: string | null;
    others: string | null;
    complementary_exams: string | null;
    diagnosis: string | null;
    trataments: string | null;
    observations: string | null;
    responsible: string | null;
}

interface RegisterUseCaseResponse {
    enchiridions: Enchiridion
}


export class CreateEnchiridionUseCase {  //cada classe tem um método
    constructor(private enchiridionRepository: EnchiridionRepository,
        private animalRepository: AnimalRepository,
        private usersRepository: UsersRepository,

    ) { }   //receber as dependencia dentro do construtor
    //retorna isso
    async execute({ animal_id, teacher_id, stringDate, history, reason_consult, vaccination, date_vaccination, deworming, date_deworming, temperature, frequency_cardiac, frequency_respiratory, dehydration, lymph_node, type_mucous, whats_mucous, skin_annex, system_circulatory, system_respiratory, system_digestive, system_locomotor, system_nervous, system_genitourinary, others, complementary_exams, diagnosis, trataments, observations, responsible }: EnchiridionUseCaseRequest): Promise<RegisterUseCaseResponse> {

        const animalINoExists = await this.animalRepository.findById(animal_id);

        if (!animalINoExists) {
            throw new AnimalNoexists()
        };

        const teacherNoExists = await this.usersRepository.findTeacherById(teacher_id);

        if (!teacherNoExists) {
            throw new teacherNoexists()
        };


        const sequence = await Sequence('enchiridion');
        const dateData = (stringDate).split("/");


        const day = parseInt(dateData[0], 10);
        const month = parseInt(dateData[1], 10) - 1;
        const year = parseInt(dateData[2], 10);

        if (day <= 0 || day > 31 || month < 0 || month >= 12) {
            throw new InvalidDateError(day, month, year);
        }

        const date = new Date(year, month, day);

        const enchiridions = await this.enchiridionRepository.createEnchiridion({
            sequence, animal_id, teacher_id, date, history, reason_consult, vaccination, date_vaccination, deworming, date_deworming, temperature, frequency_cardiac, frequency_respiratory, dehydration, lymph_node, type_mucous, whats_mucous, skin_annex, system_circulatory, system_respiratory, system_digestive, system_locomotor, system_nervous, system_genitourinary, others, complementary_exams, diagnosis, trataments, observations, responsible
        });


        return {
            enchiridions
        };
    }
}
