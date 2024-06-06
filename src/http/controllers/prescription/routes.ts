import { FastifyInstance } from "fastify";
import { createPrescription } from "./createPrescription"; // Corrigido para "Prescription"
import { getPrescriptionrById } from "./getPrescription";

export async function prescriptionRoutes(app: FastifyInstance) {
    app.post('/create/prescription', createPrescription) // Corrigido para "prescription"

    app.get('/get/prescription/id/:prescription_id', getPrescriptionrById)
} 
