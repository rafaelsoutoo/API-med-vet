import { createStudent } from "@/http/controllers/users/createStudents";
import { createTeacher } from "@/http/controllers/users/createTeachers";
import { createSecretary } from "@/http/controllers/users/createSecretary";
import { authenticate } from "@/http/controllers/users/authenticate";

import { studentSchema } from "@/docs/swagger/studentSchema";
import { teacherSchema } from "@/docs/swagger/teacherSchema";
import { secretarySchema } from "@/docs/swagger/secretarySchema";
import { sessionsSchema } from "@/docs/swagger/sessionsSchema";

import { FastifyInstance } from "fastify";
import { getAllStudent, getStudentById, getStudentByRegistration } from "./getStudent";
import { getAllTeachers, getTeacherById, getTeachersByRegistration } from "./getTeachers";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users/student", { schema: studentSchema }, createStudent);
  app.post("/users/teacher", { schema: teacherSchema }, createTeacher);
  app.post("/users/secretary", { schema: secretarySchema }, createSecretary);


  app.post("/sessions", { schema: sessionsSchema }, authenticate); //seção de autnhenticate


  app.get("/get/student", getAllStudent);
  app.get("/get/student/id/:id", getStudentById); // buscar Student pelo id
  app.get("/get/student/registration/:registration", getStudentByRegistration); // buscar student pelo registration


  app.get("/get/teacher", getAllTeachers);
  app.get("/get/teacher/id/:id", getTeacherById); // buscar student pelo id
  app.get("/get/teacher/registration/:registration", getTeachersByRegistration); // buscar student pelo registration


}
