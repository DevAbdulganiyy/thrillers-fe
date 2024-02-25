import * as yup from "yup";

type SignInSchemas = {
  email: string;
  password: string;
};

type SignUpSchemas = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms?: boolean;
  agreeContact?: boolean;
};

export const SignInSchema = yup
  .object({
    email: yup
      .string()
      .email("Kindly provide a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be atleast 6 character long"),
  })
  .required();

export const SignUpSchema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Kindly provide a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "Password should be of minimum 6 characters length"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Password's not match"),
    // acceptTerms: yup
    //   .boolean()
    //   .oneOf([true], "Must Accept Terms and Conditions"),
    // agreeContact: yup.boolean(),
  })
  .required();
