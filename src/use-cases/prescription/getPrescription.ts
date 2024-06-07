import { PrescriptionRepository } from "@/repositories/prescription-repository";
import { MedicationRepository } from "@/repositories/medication-repository";
import { AnimalRepository } from "@/repositories/animal-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { PrescriptionNoExist } from "../errors/prescription-errors";

export class GetPrescriptionByIdUseCase {
    constructor(
        private prescriptionRepository: PrescriptionRepository,
        private medicationRepository: MedicationRepository,
        private animalRepository: AnimalRepository,
        private teacherRepository: UsersRepository
    ) {}

    async execute(id: string){
        const prescription = await this.prescriptionRepository.findPrescriptionById(id);
        if (!prescription) {
            throw new PrescriptionNoExist();
        }

        const medications = await this.medicationRepository.findMedicationsByPrescriptionId(id);

        const animal = await this.animalRepository.findById(prescription.animal_id);
        const teacher = await this.teacherRepository.findTeacherById(prescription.teacher_id);

        return { 
            ...prescription, 
            medications,
            animalName: animal ? animal.name : 'Unknown',
            species: animal ? animal.species : 'Unknown',
            race: animal ? animal.race: 'Unknown',
            gender: animal ? animal.gender : 'Unknown',
            age: animal ? animal.age: 'Unknown',
            teacherName: teacher ? teacher.name : 'Unknown' 
        };
    }
}
