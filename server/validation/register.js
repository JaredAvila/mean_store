const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateRegisterInput = data => {
  let errors = {};

  //Checks if inputs are empty returns string
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //First name validations
  if (!Validator.isLength(data.firstName, { min: 2, max: 100 })) {
    errors.firstName = "Must be at least two characters";
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First name is required";
  }

  //Last name validations
  if (!Validator.isLength(data.lastName, { min: 2, max: 100 })) {
    errors.lastName = "Must be at least two characters";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name is required";
  }

  //Email validations
  if (!Validator.isEmail(data.email)) {
    errors.email = "Must be valid email address";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  //Password validations
  if (!Validator.isLength(data.password, { min: 6, max: 100 })) {
    errors.password = "Must be at least six characters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  //Password Confimation validations
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords do not match";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Must confirm password";
  }

  return { errors, isValid: isEmpty(errors) };
};
