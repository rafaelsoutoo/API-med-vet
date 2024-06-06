import PDFDocument from 'pdfkit';
import { Prescription, Medication } from '@prisma/client';

interface PrescriptionWithMedications extends Prescription {
    medications: Medication[];
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

            doc.fontSize(12).text(`Prescription ID: ${prescription.id}`);
            doc.text(`Animal ID: ${prescription.animal_id}`);
            doc.text(`Teacher ID: ${prescription.teacher_id}`);
            doc.text(`Created At: ${prescription.created_at}`);
            doc.moveDown();

            if (prescription.medications && prescription.medications.length > 0) {
                doc.text('Medications:', { underline: true });
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
