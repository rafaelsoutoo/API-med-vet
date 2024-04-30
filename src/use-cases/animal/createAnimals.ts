import { AnimalRepository } from '@/repositories/animal-repository'
import { TutorRepository } from '@/repositories/tutors-repository'
import { Animal, PrismaClient } from '@prisma/client'  //tipagem propria do prisma
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

const prisma = new PrismaClient();

async function getNextSequence() {
  let nextSequence = await prisma.animal.count() + 1;
  let sequenceExists = true;

  while (sequenceExists) {
    const existingSequence = await prisma.animal.findFirst({
      where: {
        sequence: nextSequence.toString(),
      },
    });

    // Se a sequência não existir, sai do loop
    if (!existingSequence) {
      sequenceExists = false;
    } else {
      // Se a sequência existir, incrementa e verifica novamente
      nextSequence++;
    }
  }

  return nextSequence.toString();
}



export class createAnimalsUsecase {
  constructor(private animalrepository: AnimalRepository,
    private tutorRepository: TutorRepository
  ) { }

  async execute({ name, species, race, gender, age, coat, tutor_id }: registerusecaserequest): Promise<registerusecaseresponse> {

    const tutorWithSameId = await this.tutorRepository.findById(tutor_id)
    const sequence = await getNextSequence()


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
