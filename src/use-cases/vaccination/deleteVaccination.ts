import { VaccinationRepository } from '@/repositories/vaccination-repository'

import { vaccinationNotExistsError } from '../errors/vaccination-errors'

export class deleteVaccinationUseCase {
  constructor(
    private vaccinationRepository: VaccinationRepository
  ) {}

  async execute(id: string) {
    const vaccination = await this.vaccinationRepository.findById(id)

    if(!vaccination) {
      throw new vaccinationNotExistsError()
    }

    await this.vaccinationRepository.deleteVaccination(id)
  }
}