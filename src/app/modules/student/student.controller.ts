import { Request, Response } from "express";
import { StudentService } from "./student.service";
// import studentValidationSchema from "./student.joi.validation"; -using joi for validation
import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {

    // ###JOI VALIDATION STARTS HERE###
    // const { student: studentData } = req.body; - using joi for validation

    // const { error, value } = studentValidationSchema.validate(studentData); - using joi for validation

    // const result = await StudentService.createStudentIntoDB(value); - using joi for validation

    // if (error) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid request data",
    //     error: error.details.map((detail) => detail.message).join(", "),
    //   });
    // } - using joi for validation

    // ###ZOD VALIDATION STARTS HERE###
    const { student: studentData } = req.body;
    const zodParsedData = studentValidationSchema.parse({ student: studentData });

    const result = await StudentService.createStudentIntoDB(zodParsedData.student);

    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create student",
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
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

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentFromDB(
      studentId as string,
    );

    res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve student",
      error: error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await StudentService.deleteStudentFromDB(studentId as string);

        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete student",
            error: error
        })
    }
};

const updateStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const updatedData = req.body; 
        //example of updatedData: {name: {firstName: "New name"}} 
        const result = await StudentService.updateStudent(studentId as string, updatedData);

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to update student",
            error: error
        })
    }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
