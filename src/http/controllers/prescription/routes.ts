import { FastifyInstance } from "fastify";
import { createPrescription } from "./createPrescription";
import { deletePrescription } from "./deletePrescription";

export async function prescriptionRoutes(app: FastifyInstance) {
    app.post('/create/prescription', createPrescription)
    
    app.patch('/delete/prescription', deletePrescription)
} 
