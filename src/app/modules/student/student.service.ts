import StudentModel from "../student.model";
import { Student } from "./student.interface";

const createStudentIntoDB = async (studentData: Student) => {
    // const result = await StudentModel.create(studentData); //Built in static method of mongoose model

    const student = new StudentModel(studentData); // Create an instance of the model
    const result = await student.save(); // Built in instance method of mongoose model 
    return result;
} 

const getAllStudentsFromDB = async () => {
    const result = await StudentModel.find();
    return result;
}

const getSingleStudentFromDB = async (id: string) => {
    const result = await StudentModel.findOne({id: id});
    return result;
}

export const StudentService = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB
}