import { Prescription } from '@prisma/client';
import { PrescriptionRepository } from '@/repositories/prescription-repository';
import { PrescriptionNotExists } from '../errors/prescription-errors'

export class MarkPrescriptionAsDeleteUseCase {

  constructor(
    private prescriptionRepository: PrescriptionRepository,
  ) { }

  async execute(id: string) {

    const prescription = await this.prescriptionRepository.findById(id)

    if (!prescription) {
      throw new PrescriptionNotExists()
    }

    await this.prescriptionRepository.markAsDelete(id)

  }
}
