import { FastifyInstance } from "fastify";
import { updateVaccination } from "@/http/controllers/vaccination/updateVaccinations";

export async function vaccinationRoutes(app: FastifyInstance) {
    app.put('/put/vaccinations', updateVaccination)
} 
