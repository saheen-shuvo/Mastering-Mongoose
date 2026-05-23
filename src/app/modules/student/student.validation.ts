import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z
    .string({
      error: "First name is required",
    })
    .max(20, {
      message: "First name should be less than 20 characters",
    })
    .trim()
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: "First name should start with a capital letter",
      },
    ),

  middleName: z
    .string()
    .max(20, {
      message: "Middle name should be less than 20 characters",
    })
    .trim()
    .optional(),

  lastName: z
    .string({
      error: "Last name is required",
    })
    .trim()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Last name should contain only letters",
    }),
});

const guardianValidationSchema = z.object({
  fatherName: z
    .string({
      error: "Father name is required",
    })
    .trim(),

  fatherOccupation: z
    .string({
      error: "Father occupation is required",
    })
    .trim(),

  fatherContactNo: z
    .string({
      error: "Father contact number is required",
    })
    .trim(),

  motherName: z
    .string({
      error: "Mother name is required",
    })
    .trim(),

  motherOccupation: z
    .string({
      error: "Mother occupation is required",
    })
    .trim(),

  motherContactNo: z
    .string({
      error: "Mother contact number is required",
    })
    .trim(),
});

const localGuardianValidationSchema = z.object({
  name: z
    .string({
      error: "Name is required",
    })
    .trim(),

  occupation: z
    .string({
      error: "Occupation is required",
    })
    .trim(),

  contactNo: z
    .string({
      error: "Contact number is required",
    })
    .trim(),

  address: z
    .string({
      error: "Address is required",
    })
    .trim(),
});

export const studentValidationSchema = z.object({
  student: z.object({
    id: z.string({
      error: "Student ID is required",
    }),

    name: userNameValidationSchema,

    gender: z.enum(["male", "female", "other"], {
      message: "Gender must be male, female or other",
    }),

    dateOfBirth: z.string().trim().optional(),

    email: z
      .string({
        error: "Email is required",
      })
      .email({
        message: "Invalid email address",
      }),

    contactNo: z
      .string({
        error: "Contact number is required",
      })
      .trim(),

    emergencyContactNo: z
      .string({
        error: "Emergency contact number is required",
      })
      .trim(),

    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .optional(),

    presentAddress: z
      .string({
        error: "Present address is required",
      })
      .trim(),

    permanentAddress: z
      .string({
        error: "Permanent address is required",
      })
      .trim(),

    guardian: guardianValidationSchema,

    localGuardian: localGuardianValidationSchema,

    profileImage: z.string().optional(),

    isActive: z.enum(["active", "blocked"]).optional(),

    isDeleted: z.boolean().optional(),
  }),
});

export default studentValidationSchema;
