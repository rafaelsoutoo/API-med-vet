import { PrescriptionRepository } from "@/repositories/prescription-repository";

export class GetPrescriptionByIdUseCase {
    constructor(private prescriptionRepository: PrescriptionRepository) { }
  
    async execute(id: string) {
      const prescription = await this.prescriptionRepository.findPrescriptionById(id);
  
      return prescription;
    }
  }
  