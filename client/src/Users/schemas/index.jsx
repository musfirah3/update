import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(5).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your valid email."),
  password: Yup.string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    confrimPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
  address1: Yup.string().required("Please enter your address"),
  address2: Yup.string().required("Please enter your nearset place"),
  phoneNo: Yup.number()
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required("Please enter your phone number"),
  telePhone: Yup.number()
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required("Please enter your telephone or emergency case phone number"),
  country: Yup.string().required("Please enter your country name"),
  city: Yup.string().required("Please enter your city"),
  region: Yup.string().required("Please enter your region"),
  zipCode: 
  Yup.string()
  .min(5, 'Must be exactly 5 digits')
  .max(5, 'Must be exactly 5 digits')
    .required("Please enter your district zip code"),
});
