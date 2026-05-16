import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();

// http://localhost:3000/api/v1/students
router.get("/", StudentController.getAllStudents);

// http://localhost:3000/api/v1/students/create-student , Here add a student object in the body
router.post("/create-student", StudentController.createStudent);

// http://localhost:3000/api/v1/students/STU12346, Here add the student id in the params
router.get("/:studentId", StudentController.getSingleStudent);

export const StudentRoute = router;
