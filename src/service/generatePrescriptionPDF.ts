import PDFDocument from 'pdfkit';
import { Prescription, Medication } from '@prisma/client';

interface PrescriptionWithMedications extends Prescription {
    medications: Medication[];
    animalName: string
    species: string
    age: string
    gender: string
    race: string
    teacherName: string
}

export async function generatePrescriptionPDF(prescription: PrescriptionWithMedications): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            let buffers: Buffer[] = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(buffers);
                resolve(pdfBuffer);
            });

            doc.text(`Paciente: ${prescription.animalName}`);
            doc.text(`Tutor: ${prescription.teacherName}`);
            doc.text(`Espécie: ${prescription.species}`);
            doc.text(`Raça: ${prescription.race}`);
            doc.text(`Sexo: ${prescription.gender}`);
            doc.text(`Idade: ${prescription.age}`);
            doc.text(`Espécie: ${prescription.species}`);
            doc.moveDown();

            if (prescription.medications && prescription.medications.length > 0) {
                prescription.medications.forEach((medication, index) => {
                    doc.text(`Medication ${index + 1}:`);
                    doc.text(`  Use Type: ${medication.use_type}`);
                    doc.text(`  Pharmacy: ${medication.pharmacy}`);
                    doc.text(`  Unit: ${medication.unit}`);
                    doc.text(`  Measurement: ${medication.measurement}`);
                    doc.text(`  Description: ${medication.description}`);
                    doc.moveDown();
                });
            }

            doc.end();
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            reject(error);
        }
    });
}
