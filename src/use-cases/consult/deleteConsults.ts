import { ConsultsNotExistsError } from '@/use-cases/errors/consult-error'
import { ConsultsRepository } from '@/repositories/consult-repository'

interface DeleteUseCaseRequest {
  id: string
}


export class DeleteConsultUseCase {

  constructor(
    private consultRepository: ConsultsRepository
  ) { }

  async execute({ id }: DeleteUseCaseRequest) {


    const consultExists = await this.consultRepository.findById(id)


    if (!consultExists) { 
      throw new ConsultsNotExistsError()
    }

    await this.consultRepository.deleteConsult(id)

  }
}