import * as Yup from "yup"; 

const LOGIN_INTIAL_VALUES = {
    email: "",
    password: "",
  };

const LOGIN_VALIDATION_SCHEMA = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string().required("Password is required"),
  });

  export const LOGIN_FORM = {
    INTIAL_VALUES : LOGIN_INTIAL_VALUES,
    VALIDATION_SCHEMA : LOGIN_VALIDATION_SCHEMA
}

   const REGISTER_INTIAL_VALUES_STEP_1 =  { firstname: "", lastname: "", email: "" }

   const REGISTER_VALIDATION_SCHEMA_STEP_1 = Yup.object({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Enter a valid email").required("Email is required"),
  });

  const REGISTER_INTIAL_VALUES_STEP_2 = { countryId: 0, code: null, membertype: "" }

  const REGISTER_VALIDATION_SCHEMA_STEP_2 = Yup.object({
    membertype: Yup.string().required("Please select a Member Type"),
    countryId: Yup.number()
      .moreThan(0, "Please select a Country")
      .required("Please select a Country"),
  });
   const REGISTER_INTIAL_VALUES_STEP_3 = { password: "", cpassword: "", termsAccepted: false }

   const REGISTER_VALIDATION_SCHEMA_STEP_3 = Yup.object({
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long, use upper-case and lower-case letters, and include both digits and special characters."
      )
      .required("Please enter a password"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password does not match")
      .required("Please repeat a password"),
    termsAccepted: Yup.boolean()
      .oneOf([true], "Please accept Terms and Conditions")
      .required("Please accept Terms and Conditions"),
  });

 const REGISTER_INTIAL_VALUES = {
    id: 0,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    memberType: "",
    countryId: 1,
    organisationCode: null,
    roleId: 1,
  }

export const REGISTER_FORM = {
    STEP_1_INTIAL_VALUES : REGISTER_INTIAL_VALUES_STEP_1,
    STEP_1_VALIDATION_SCHEMA : REGISTER_VALIDATION_SCHEMA_STEP_1,
    STEP_2_INTIAL_VALUES : REGISTER_INTIAL_VALUES_STEP_2,
    STEP_2_VALIDATION_SCHEMA : REGISTER_VALIDATION_SCHEMA_STEP_2,
    STEP_3_INTIAL_VALUES : REGISTER_INTIAL_VALUES_STEP_3,
    STEP_3_VALIDATION_SCHEMA : REGISTER_VALIDATION_SCHEMA_STEP_3,
    INTIAL_VALUES : REGISTER_INTIAL_VALUES
}