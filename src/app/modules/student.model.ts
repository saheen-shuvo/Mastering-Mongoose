import { Schema, model } from "mongoose";
import { TGuardian, TLocalGuardian, TStudent, StudentMethods, StudentModel, TUserName } from "./student/student.interface";
import validator from "validator";

const userNameSchema = new Schema<TUserName>({
    firstName: {type: String, required: [true, "First name is required"], maxLength: [20, "First name should be less than 20 characters"], trim: true, validate: {
        validator: function(value: string){
            const firstNameValue = value.charAt(0).toUpperCase() + value.slice(1);
            return firstNameValue === value;
        },
        message: "{VALUE} should start with a capital letter"
    }},
    middleName: {type: String, maxLength: [20, "Middle name should be less than 20 characters"], trim: true},
    lastName: {type: String, required: [true, "Last name is required"], trim: true, validate: {
        validator: (value: string) => validator.isAlpha(value),
        message: "{VALUE} should contain only letters"
    }}
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: {type: String, required: [true, "Father name is required"], trim: true},
    fatherOccupation: {type: String, required: [true, "Father occupation is required"], trim: true},
    fatherContactNo: {type: String, required: [true, "Father contact number is required"], trim: true},
    motherName: {type: String, required: [true, "Mother name is required"], trim: true},
    motherOccupation: {type: String, required: [true, "Mother occupation is required"], trim: true},
    motherContactNo: {type: String, required: [true, "Mother contact number is required"], trim: true}
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {type: String, required: [true, "Name is required"], trim: true},
    occupation: {type: String, required: [true, "Occupation is required"], trim: true},
    contactNo: {type: String, required: [true, "Contact number is required"], trim: true},
    address: {type: String, required: [true, "Address is required"], trim: true}
});


//Main student schema
const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
    id: {type: String, required: [true, "Student ID is required"], unique: true},
    name: {
        type: userNameSchema,
        required: [true, "Name is required"]
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            // message: "Gender must be either 'male', 'female or 'other'"
            message: "{VALUE} is not a valid gender"
        },
        required: [true, "Gender is required"]
    },
    dateOfBirth: {type: String, trim: true},
    email: {type: String, required: [true, "Email is required"], unique: true, validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "{VALUE} is not a valid email"
    }},
    contactNo: {type: String, required: [true, "Contact number is required"], trim: true},
    emergencyContactNo: {type: String, required: [true, "Emergency contact number is required"], trim: true},
    bloodGroup: {
        type: String,
        enum: {
            values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            message: "{VALUE} is not a valid blood group"
        }
    },
    presentAddress: {type: String, required: [true, "Present address is required"], trim: true},
    permanentAddress: {type: String, required: [true, "Permanent address is required"], trim: true},
    guardian: {
        type: guardianSchema,
        required: [true, "Guardian is required"]
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, "Local guardian is required"]
    },
    profileImage: {type: String},
    isActive: {
        type: String,
        enum: ["active", "blocked"],
        default: "active"
    }
})

//MONGOOSE MIDDLEWARE
//here i have not used arrow function because i need to access "this" keyword which is not possible in arrow function
//before bcrypt password hashing, i have to install bcrypt package and import it here which i didn't do
//Pre save hook for hashing password

// studentSchema.pre("save", async function(next){
    // const student = this;
    // const salt = await bcrypt.genSalt(10); --this will write in .env file as BCRYPT_SALT_ROUNDS=10
    // const hashedPassword = await bcrypt.hash(student.password, salt);
    // student.password = hashedPassword;
    // next();
// })

//Post save hook for logging
// studentSchema.post("save", function(){
//     console.log("Student saved successfully");
// });

studentSchema.methods.isUserExists = async function(id: string){
    const existingUser = await Student.findOne({id: id});
    return existingUser;
}

const Student = model<TStudent, StudentModel>("Student", studentSchema)

export default Student;