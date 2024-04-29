import { EnchiridionRepository } from '@/repositories/enchiridion-repository'
import { TutorRepository} from '@/repositories/tutors-repository'
import { AnimalRepository} from '@/repositories/animal-repository'




import { Enchiridion, PrismaClient } from '@prisma/client'  //tipagem propria do prisma
import { AnimalNoexists } from '@/use-cases/errors/animal-errors';
import { TutorNotExistsError } from '@/use-cases/errors/tutor-error';

interface EnchiridionUseCaseRequest {
  tutor_id: string
}

  interface RegisterUseCaseResponse {
    enchiridions: Enchiridion[]
}


export class getTutorIdEnchiridionUseCase {  //cada classe tem um método
    constructor(private enchiridionRepository: EnchiridionRepository,
        private tutorRepository:TutorRepository,
        private animalRepository: AnimalRepository
    ) { }   //receber as dependencia dentro do construtor
    //retorna isso
    async execute({ tutor_id }: EnchiridionUseCaseRequest): Promise<RegisterUseCaseResponse> {

        const tutorNoExists = await this.tutorRepository.findById(tutor_id);

        if (!tutorNoExists) {
          throw new TutorNotExistsError()
        };


        
        const animais = await this.animalRepository.findManyIdTutor(tutor_id);

     
        const animalsId = animais.map((animal) => animal.id);
 


     

        const enchiridions = await this.enchiridionRepository.findByIdAnimalEnchiridion(animalsId);


        return {
            enchiridions
        };
    }
}