import { Request, Response } from "express";
import { StudentService } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const {student: studentData} = req.body;
    const result = await StudentService.createStudentIntoDB(studentData);

    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create student",
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try{
    const result = await StudentService.getAllStudentsFromDB();
    
    res.status(200).json({
      success: true,
      message: "Students retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve students",
      error: error,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
};