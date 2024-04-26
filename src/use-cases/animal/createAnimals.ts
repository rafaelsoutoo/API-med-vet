import { AnimalRepository } from '@/repositories/animal-repository'
import {TutorRepository} from '@/repositories/tutors-repository'
import { Animal } from '@prisma/client'  //tipagem propria do prisma
import { TutorNotExistsError } from '@/use-cases/errors/tutor-error';


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



export class createAnimalsUsecase { 
  constructor(private animalrepository: AnimalRepository,
    private tutorRepository: TutorRepository
  ) {}   
                                                                    
  async execute({ name, species, race, gender, age, coat, tutor_id}: registerusecaserequest): Promise<registerusecaseresponse> {

    const tutorWithSameId = await this.tutorRepository.findById(tutor_id);

    if (!tutorWithSameId) {
      throw new TutorNotExistsError()
    };


                    
    const animal = await this.animalrepository.createAnimal({ 
        name, species, race, gender, age, coat, tutor_id
    })

    return {
      animal
    }
  }
}
