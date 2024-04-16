import { TutorRepository } from '@/repositories/tutors-repository';

export class GetAllTutorsUseCase {
    constructor(private tutorsRepository: TutorRepository) {}

    async execute(page: number, numberOfItems: number) {
        const tutors = await this.tutorsRepository.getAllTutors(page, numberOfItems)

        return tutors
    };


}
