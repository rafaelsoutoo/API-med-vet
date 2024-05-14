import { ConsultsNotExistsError } from '@/use-cases/errors/consult-error'
import { ConsultsRepository } from '@/repositories/consult-repository'

export class DeleteConsultUseCase {

  constructor(
    private consultRepository: ConsultsRepository
  ) { }

  async execute(id: string) {


    const consultExists = await this.consultRepository.findById(id)


    if (!consultExists) { 
      throw new ConsultsNotExistsError()
    }

    await this.consultRepository.deleteConsult(id)

  }
}