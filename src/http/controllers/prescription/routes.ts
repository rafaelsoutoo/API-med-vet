import { FastifyInstance } from "fastify";
import { createPrescription } from "./createPrescription"; 
import { GetPrescriptionById, PDFPrescriptionById } from "./getPrescription";
import { deletePrescription } from "./deletePrescription";

export async function prescriptionRoutes(app: FastifyInstance) {
    app.post('/create/prescription', createPrescription)

    app.get('/pdf/prescription/:prescription_id', PDFPrescriptionById)
    app.get('/get/prescription/id/:prescription_id', GetPrescriptionById)

  
    app.patch('/delete/prescription', deletePrescription)
} 
