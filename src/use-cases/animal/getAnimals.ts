import { AnimalRepository } from "@/repositories/animal-repository"
import { AnimalNoexists } from "../errors/animal-errors";
import { TutorNotExistsError } from "../errors/tutor-error";
import { TutorRepository } from "@/repositories/tutors-repository";
import { PrismaAnimalsRepository } from "@/repositories/Prisma/prisma-animals-repository";



export class GetAllAnimalsUseCase {
    constructor(
        private animalRepository: AnimalRepository,
        private tutorRepository: TutorRepository
    ) { }

    async execute(page: number, numberOfItems: number) {
        const animals = await this.animalRepository.getAllAnimals(page, numberOfItems);

        if (animals.length === 0) {
            throw new AnimalNoexists();
        }

        if (animals && Array.isArray(animals)) {
            const dataPromises = animals.map(async (animal) => {
                const tutor = await this.tutorRepository.findById(animal.tutor_id);

                return {
                    sequence: animal.sequence,
                    animal_id: animal.id,
                    animal_name: animal.name,
                    tutor_name: tutor?.name
                };
            });

            const data = await Promise.all(dataPromises);
            return data;
        }
    }
}


export class GetAnimalByTutorUseCase {
    constructor(private animalRepository: AnimalRepository, private tutorRepository: TutorRepository) { }

    async execute(tutor_id: string) {
        const tutor = await this.tutorRepository.findById(tutor_id)

        if (!tutor) {
            throw new TutorNotExistsError()
        }

        const animals = await this.animalRepository.findByTutor(tutor_id);

        if (animals.length === 0) {
            throw new AnimalNoexists()
        }

        return animals
    }
}

export class GetAnimalById {
    constructor(
        private animalRepository: AnimalRepository,
        private tutorRepository: TutorRepository
    ) { }

    async execute(id: string) {
        const animal = await this.animalRepository.findById(id)

        if (!animal) {
            throw new AnimalNoexists()
        }

        const tutor = await this.tutorRepository.findById(animal.tutor_id)

        return {
            id: animal.id,
            sequence: animal.sequence,
            name: animal.name,
            created_at: animal.created_at,
            species: animal.species,
            race: animal.race,
            gender: animal.gender,
            age: animal.age,
            coat: animal.coat,
            tutor: {
                id: tutor?.id,
                name: tutor?.name,
                phone: tutor?.phone
            }
        }
    }
}

export class GetAnimalBySequenceUseCase {
    constructor(private animalRepository: AnimalRepository) { }

    async execute(sequence: string) {
        const AnimalNoExists = await this.animalRepository.findBySequence(sequence)

        if (!AnimalNoExists) {
            throw new AnimalNoexists()
        }

        const user = await this.animalRepository.findBySequence(sequence);

        return user;
    }
}

export class GetAnimalByNameTutorUseCase {
    constructor(
        private animalRepository: AnimalRepository,
        private tutorRepository: TutorRepository
    ) { }

    async execute(name: string) {
        const tutor = await this.tutorRepository.searchByNameTutor(name, 1)

        if (!tutor){
            throw new TutorNotExistsError()
        }

        const data = []

        for(let i = 0; i < tutor.length; i++) {
            const animals = await this.animalRepository.findByTutor(tutor[i].id)
            const datased = {
                id: tutor[i].id,
                name: tutor[i].name,
                sequence: tutor[i].sequence,
                cpf: tutor[i].cpf,
                email: tutor[i].email,
                phone: tutor[i].phone,
                created_at: tutor[i].created_at,
                animals
            }

            data.push(datased)
        }
        
        return data

    }
}


export class GetAnimalByAnimalorTutor {
    constructor(
        private animalRepository: PrismaAnimalsRepository,
        private tutorRepository: TutorRepository
    ) { }

    async execute(q: string){
        const animals = await this.animalRepository.searchByNameAnimalorSequnce(q)

        if (animals && Array.isArray(animals)) {
            const dataPromises = animals.map(async (animal) => {
                const tutor = await this.tutorRepository.findById(animal.tutor_id);

                return {
                    sequence: animal.sequence,
                    animal_id: animal.id,
                    animal_name: animal.name,
                    tutor_name: tutor?.name
                };
            });

            const data = await Promise.all(dataPromises);
            return data;
        }
    }
}

