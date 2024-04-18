import { ConsultsRepository } from "@/repositories/consult-repository"

export class GetAllConsultsUseCase {
    constructor(private consultsRepository: ConsultsRepository) {}

    async execute(page: number, numberOfItems: number) {
        const consults = await this.consultsRepository.getAllConsultsDone(page, numberOfItems)

        return consults
        };
}
