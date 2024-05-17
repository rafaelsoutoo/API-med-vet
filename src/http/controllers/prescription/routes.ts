import { FastifyInstance } from "fastify";
import { createPrescription } from "./createPrescription"; // Corrigido para "Prescription"

export async function prescriptionRoutes(app: FastifyInstance) {
    app.post('/create/prescription', createPrescription) // Corrigido para "prescription"
} 
