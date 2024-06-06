import { Vaccination } from '@prisma/client'
import { TutorNotExistsError } from '../errors/tutor-error'
import { VaccinationRepository } from '@/repositories/vaccination-repository'

interface UpdateUseCaseRequest {
  vaccinations: any
}

export class UpdateVaccinationUseCase {

  constructor(private vaccinationRepository: VaccinationRepository) { }

  async execute( vaccinations  : UpdateUseCaseRequest) {

    // const vaccinationExists = await this.vaccinationRepository.findById(id)

    // if (!vaccinationExists) {
    //   throw new TutorNotExistsError()

    // }


    



    if (vaccinations && Array.isArray(vaccinations)) {
      const updatedVaccinations = await Promise.all(vaccinations.map(async (vaccine: any) => {
        const { id, date, name } = vaccine;
        await this.vaccinationRepository.updateVaccination(id, { date, name });
        return { id, date, name};
      }));
      return updatedVaccinations;
    }
    return [];

  }
}








    // if (vaccinations && Array.isArray(vaccinations)) {
    //   vaccinations.forEach(async (vaccine: any) => {
    //     let id = vaccine.id
    //     let date = vaccine.date;
    //     let name = vaccine.name;


    //     await this.vaccinationRepository.updateVaccination(id, {
    //       date,
    //       name
    //     });

    //   });
    // }