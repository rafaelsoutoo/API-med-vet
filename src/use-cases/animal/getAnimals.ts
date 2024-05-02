import { AnimalRepository } from "@/repositories/animal-repository"
import { AnimalNoexists } from "../errors/animal-errors";


export class GetAllAnimalsUseCase {
    constructor(private animalRepository: AnimalRepository) { }

    async execute(page: number, numberOfItems: number) {
        const users = await this.animalRepository.getAllAnimals(page, numberOfItems);

        if (users.length === 0) {
            throw new AnimalNoexists()
        }

        return users;
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