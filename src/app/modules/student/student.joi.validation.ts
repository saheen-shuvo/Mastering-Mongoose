import joi  from 'joi';

const studentValidationSchema = joi.object({
  id: joi.string().required(),
  name: joi
    .object({
      firstName: joi.string().max(20).pattern(/^[a-zA-Z]+$/).required(),
      middleName: joi.string().max(20).allow(null, ""),
      lastName: joi.string().max(20).pattern(/^[a-zA-Z]+$/).required(),
    })
    .required(),
  gender: joi.string().required().valid("male", "female", "other"),
  dateOfBirth: joi.string().allow(null, ""),
  email: joi.string().email().required(),
  contactNo: joi.string().required(),
  emergencyContactNo: joi.string().required(),
  bloodGroup: joi
    .string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .allow(null, ""),
  presentAddress: joi.string().required(),
  permanentAddress: joi.string().required(),
  guardian: joi
    .object({
      fatherName: joi.string().required(),
      fatherOccupation: joi.string().required(),
      fatherContactNo: joi.string().required(),
      motherName: joi.string().required(),
      motherOccupation: joi.string().required(),
      motherContactNo: joi.string().required(),
    })
    .required(),
  localGuardian: joi
    .object({
      name: joi.string().required(),
      occupation: joi.string().required(),
      contactNo: joi.string().required(),
      address: joi.string().required(),
    })
    .required(),
  profileImage: joi.string().allow(null, ""),
  isActive: joi.string().valid("active", "blocked").allow(null, ""),
});

export default studentValidationSchema;