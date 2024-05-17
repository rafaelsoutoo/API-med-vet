import { AnimalRepository } from '@/repositories/animal-repository'
import { TutorRepository } from '@/repositories/tutors-repository'
import { Animal } from '@prisma/client'  //tipagem propria do prisma
import { TutorNotExistsError } from '@/use-cases/errors/tutor-error';
import { AnimalAlreadyExistsError } from '../errors/animal-errors';
// import { Sequence } from '@/utils/sequence';


interface registerusecaserequest {
  name: string
  species: string;
  race: string | null;
  gender: string;
  age: string;
  weight: string | null
  coat: string | null;
  tutor_id: string;
}

interface registerusecaseresponse {
  animal: Animal
}


export class CreateAnimalsUsecase {
  constructor(
    private animalrepository: AnimalRepository,
    private tutorRepository: TutorRepository
  ) { }

  async execute({
    name,
    species,
    race,
    gender,
    age,
    weight,
    coat,
    tutor_id
  }: registerusecaserequest): Promise<registerusecaseresponse> {

    const tutorWithSameId = await this.tutorRepository.findById(tutor_id)
    const sequence = await this.animalrepository.sequence()


    if (!tutorWithSameId) {
      throw new TutorNotExistsError()
    }

    const existingAnimal = await this.animalrepository.findByNameAgeSpecies(name, age, species, tutor_id);
    if (existingAnimal) {
      throw new AnimalAlreadyExistsError();
    }


    const animal = await this.animalrepository.createAnimal({
      sequence, name, species, race, gender, age, weight, coat, tutor_id
    })

    return {
      animal
    }
  }
}
