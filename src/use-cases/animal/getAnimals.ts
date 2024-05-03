import { AnimalRepository } from "@/repositories/animal-repository"
import { AnimalNoexists } from "../errors/animal-errors";
import { TutorRepository } from "@/repositories/tutors-repository";
import { TutorNotExistsError } from "../errors/tutor-error";


export class GetAllAnimalsUseCase {
    constructor(private animalRepository: AnimalRepository) { }

    async execute(page: number, numberOfItems: number) {
        const animals = await this.animalRepository.getAllAnimals(page, numberOfItems);

        if (animals.length === 0) {
            throw new AnimalNoexists()
        }

        return animals;
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
    constructor(private animalRepository: AnimalRepository) { }

    async execute(id: string) {
        const AnimalNoExists = await this.animalRepository.findById(id);

        if (!AnimalNoExists) {
            throw new AnimalNoexists()
        }
        const user = await this.animalRepository.findById(id)

        return user

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
    constructor(private animalRepository: AnimalRepository) { }

    async execute(name: string) {

        const user = await this.animalRepository.searchAnimalByNameTutor(name)

        return user
    }
}