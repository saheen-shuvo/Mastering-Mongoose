import Student from "../student.model";
import { TStudent } from "./student.interface";

const createStudentIntoDB = async (studentData: TStudent) => {
    // const result = await StudentModel.create(studentData); //Built in static method of mongoose model

    const student = new Student(studentData); // Create an instance of the model
    if(await student.isUserExists(studentData.id)){
        throw new Error("Student already exists");
    }
    const result = await student.save(); // Built in instance method of mongoose model 
    return result;
} 

const getAllStudentsFromDB = async () => {
    const result = await Student.find();
    return result;
}

const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.findOne({id: id});
    return result;
}

export const StudentService = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB
}