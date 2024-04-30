import { createStudent } from "./student/createStudents";
import { createTeacher } from "./teacher/createTeachers";
import { createSecretary } from "./secretary/createSecretary";
import { authenticate } from "@/http/controllers/users/authenticate";

import { studentSchema } from "@/docs/swagger/studentSchema";
import { teacherSchema } from "@/docs/swagger/teacherSchema";
import { secretarySchema } from "@/docs/swagger/secretarySchema";
import { sessionsSchema } from "@/docs/swagger/sessionsSchema";
import { getAllStudentsSchema } from "@/docs/swagger/getAllStudentSchema";
import {getStudentByIdSchema } from "@/docs/swagger/getStudentByIdSchema";
import {getStudentByRegistrationSchema } from "@/docs/swagger/getStudentByRegistrationSchema";
import {getAllTeachersSchema} from "@/docs/swagger/getAllTeachersSchema";
import {getTeacherByIdSchema} from "@/docs/swagger/getTeacherByIdSchema";
import {getTeachersByRegistrationSchema} from "@/docs/swagger/getTeachersByRegistrationSchema";



import { FastifyInstance } from "fastify";
import { getAllStudent, getStudentById, getStudentByRegistration } from "./student/getStudent";
import { getAllTeachers, getTeacherById, getTeachersByRegistration } from "./teacher/getTeachers";
import { updateSecretary } from "./secretary/updateSecretary";
import { updateStudent } from "./student/updateStudent";
import { updateTeacher } from "./teacher/updateTeacher";
import { deleteSecretary } from "./secretary/deleteSecretary";
import { deleteStudent } from "./student/deleteStudent";
import { deleteTeacher } from "./teacher/deleteTeacher";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users/student", { schema: studentSchema }, createStudent);
  app.post("/users/teacher", { schema: teacherSchema }, createTeacher);
  app.post("/users/secretary", { schema: secretarySchema }, createSecretary);


  app.post("/sessions", { schema: sessionsSchema }, authenticate); //seção de autnhenticate


  app.get("/get/student", { schema: getAllStudentsSchema }, getAllStudent);
  app.get("/get/student/id/:id",{ schema: getStudentByIdSchema }, getStudentById); // buscar Student pelo id
  app.get("/get/student/registration/:registration",{ schema: getStudentByRegistrationSchema}, getStudentByRegistration); // buscar student pelo registration


  app.get("/get/teacher",{ schema: getAllTeachersSchema}, getAllTeachers);
  app.get("/get/teacher/id/:id",{ schema: getTeacherByIdSchema}, getTeacherById); // buscar student pelo id
  app.get("/get/teacher/registration/:registration",{ schema: getTeachersByRegistrationSchema}, getTeachersByRegistration); // buscar student pelo registration

  app.put("/put/secretary", updateSecretary)
  app.put("/put/student", updateStudent)
  app.put("/put/teacher", updateTeacher)

  app.delete("/delete/secretary/:id", deleteSecretary)
  app.delete("/delete/student/:id", deleteStudent)
  app.delete("/delete/teacher/:id", deleteTeacher)
}
