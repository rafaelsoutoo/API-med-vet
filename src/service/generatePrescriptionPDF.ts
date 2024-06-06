import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { Prescription } from '@prisma/client'; 

export async function generatePrescriptionPDF(prescription: Prescription): Promise<string> {
    try {
        // Inicialize um novo documento PDF
        const doc = new PDFDocument();

        // Adicione as informações da prescrição ao PDF
        doc.fontSize(12).text(`Prescription ID: ${prescription.id}`);
        doc.text(`Animal ID: ${prescription.animal_id}`);
        doc.text(`Teacher ID: ${prescription.teacher_id}`);
        doc.text(`Created At: ${prescription.created_at}`);
        doc.moveDown();

        // Adicione informações dos medicamentos, se necessário
        // ...

        // Salve o PDF em um arquivo
        const outputPath = path.join(__dirname, 'prescription.pdf');
        const writeStream = fs.createWriteStream(outputPath);
        doc.pipe(writeStream);
        doc.end();

        // Retorne o caminho do arquivo PDF gerado
        return outputPath;
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        throw error;
    }
}
