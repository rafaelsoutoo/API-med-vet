import { animalsrepository } from '@/repositories/animals-repository'
import { Animal } from '@prisma/client'  //tipagem propria do prisma
import { animalalreadyexistserror } from './errors/animal-already-exists-error'

interface registerusecaserequest {
    name: string
}

interface registerusecaseresponse {
  animal: Animal
}



export class createanimalsusecase {  //cada classe tem um método
  constructor(private animalrepository: animalsrepository) {}   //receber as dependencia dentro do construtor
                                                                    //retorna isso
  async execute({ name }: registerusecaserequest): promise<registerusecaseresponse> {

    const animalwithsameid = await this.animalsrepository.findbyId(id)

    if (animalwithsameid) { //se o usuario existe
        throw new animalalreadyexistserror()
      }


                     //recebendo repositorio do construtor
    const animal = await this.usersrepository.createsecretarys({   //cria o usuario no banco de dados
      name
    })

    return {
      animal
    }
  }
}
