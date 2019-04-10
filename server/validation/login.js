const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateLoginInput = data => {
  let errors = {};

  //Checks if inputs are empty returns string
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //Email validations
  if (!Validator.isEmail(data.email)) {
    errors.email = "Must be valid email address";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  //Password validations
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
