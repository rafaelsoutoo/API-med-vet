import { AnimalRepository } from '@/repositories/animal-repository'
import { TutorRepository } from '@/repositories/tutors-repository'
import { Animal } from '@prisma/client'  //tipagem propria do prisma
import { TutorNotExistsError } from '@/use-cases/errors/tutor-error';
import { Sequence } from '@/utils/sequence';


interface registerusecaserequest {
  name: string
  species: string;
  race: string | null;
  gender: string;
  age: string;
  coat: string | null;
  tutor_id: string;
}

interface registerusecaseresponse {
  animal: Animal
}

async function sequenceDef(): Promise<string> {
  const sequence: string = await Sequence('animal')
  return sequence

}

export class CreateAnimalsUsecase {
  constructor(private animalrepository: AnimalRepository,
    private tutorRepository: TutorRepository
  ) { }

  async execute({ name, species, race, gender, age, coat, tutor_id }: registerusecaserequest): Promise<registerusecaseresponse> {

    const tutorWithSameId = await this.tutorRepository.findById(tutor_id)
    const sequence = await sequenceDef()


    if (!tutorWithSameId) {
      throw new TutorNotExistsError()
    };



    const animal = await this.animalrepository.createAnimal({
      sequence, name, species, race, gender, age, coat, tutor_id
    })

    return {
      animal
    }
  }
}
