const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateAdminLoginInput = data => {
  let errors = {};

  //Checks if inputs are empty returns string
  data.user.email = !isEmpty(data.user.email) ? data.user.email : "";
  data.user.password = !isEmpty(data.user.password) ? data.user.password : "";

  //Email validations
  if (!Validator.isEmail(data.user.email)) {
    errors.email = "Must be valid email address";
  }
  if (Validator.isEmpty(data.user.email)) {
    errors.email = "Email is required";
  }

  //Password validations
  if (Validator.isEmpty(data.user.password)) {
    errors.password = "Password is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
