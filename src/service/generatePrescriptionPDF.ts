import PDFDocument from 'pdfkit';
import { Prescription } from '@prisma/client';

export async function generatePrescriptionPDF(prescription: Prescription): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        try {
            // Inicialize um novo documento PDF
            const doc = new PDFDocument();

            // Crie um buffer para armazenar o PDF gerado
            let buffers: Buffer[] = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                // Combine os buffers em um único buffer
                const pdfBuffer = Buffer.concat(buffers);
                resolve(pdfBuffer);
            });

            // Adicione as informações da prescrição ao PDF
            doc.fontSize(12).text(`Prescription ID: ${prescription.id}`);
            doc.text(`Animal ID: ${prescription.animal_id}`);
            doc.text(`Teacher ID: ${prescription.teacher_id}`);
            doc.text(`Created At: ${prescription.created_at}`);
            doc.moveDown();

            // Adicione informações dos medicamentos, se necessário
            // ...

            // Finalize o documento PDF
            doc.end();
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            reject(error);
        }
    });
}
