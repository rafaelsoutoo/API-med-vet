import { FastifyInstance } from "fastify";
import { createPrescription } from "./createPrescription";
import { deletePrescription } from "./deletePrescription";
import { PDFPrescriptionById } from "./getPrescription";

export async function prescriptionRoutes(app: FastifyInstance) {
    app.post('/create/prescription', createPrescription)

    app.get('/pdf/prescription/:prescription_id', PDFPrescriptionById)
  
    app.patch('/delete/prescription', deletePrescription)
} 
