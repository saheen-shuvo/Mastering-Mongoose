import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();

router.get("/", StudentController.getAllStudents);
router.post("/create-student", StudentController.createStudent);

export const StudentRoute = router;
