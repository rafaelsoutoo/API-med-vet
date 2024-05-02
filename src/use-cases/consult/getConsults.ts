import { TutorRepository } from '../../repositories/tutors-repository';
import { ConsultsRepository } from "@/repositories/consult-repository"

export class GetAllConsultsUseCase {
  constructor(private consultsRepository: ConsultsRepository, private tutorRepository: TutorRepository) { }

  async execute() {
    const consults = await this.consultsRepository.getAllConsultsDone()

    interface ConsultInfo {
      id: string,
      sequence: string;
      nameTutor: string;
      nameAnimal: string;
      phone: string;
      species: string;
      description: string | null;
    }
    interface ConsultDate {

      [key: string]: ConsultInfo[]

    }

    const result: ConsultDate = {};

    while (consults.length > 0) {

      let data = consults.shift();

      if (data) {
        let idTutor = data.tutor_id
        let idConsult = data.id
        try {
          let tutor = await this.tutorRepository.findById(idTutor)

          if (tutor) {
            var nameTutor = tutor?.name
            var phoneTutor = tutor?.phone

            let nameAnimal: string = data.nameAnimal;

            let specie: string = data.species;
            let description: string | null = data.description


            //date
            let dataTime: string = data.date.toISOString()
            let time: string = setTime(dataTime)
            let sequence = data?.sequence


            var consultInfo: ConsultInfo = {
              id: idConsult,
              sequence: sequence,
              nameTutor: nameTutor,
              nameAnimal: nameAnimal,
              phone: phoneTutor,
              species: specie,
              description: description
            }

            if (result[time]) {
              result[time].push(consultInfo);
            } else {
              result[time] = [consultInfo];
            }

          };

          function setTime(dataTime: string) {
            let dataTimeSplit: string = dataTime.split('T')[0]
            let time: string[] = dataTimeSplit.split('-')
            let date: string = `${time[2]}${time[1]}${time[0]}`

            return date
          };

        } catch (err) {
          throw new Error('cant find tutor in data')
        };
      }
    };

    return result
  }
}
export class GetConsultBySequenceUseCase {
  constructor(private usersRepository: ConsultsRepository) { }

  async execute(sequence: string) {
    const user = await this.usersRepository.findBySequence(sequence);

    return user;
  }
}

