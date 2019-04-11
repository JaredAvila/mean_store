const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateItemInput = data => {
  let errors = {};

  //Checks if inputs are empty returns string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.img = !isEmpty(data.img) ? data.img : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (Validator.isEmpty(data.desc)) {
    errors.desc = "Description is required";
  }
  if (Validator.isEmpty(data.category)) {
    errors.category = "Must select a category";
  }
  if (Validator.isEmpty(data.img)) {
    errors.img = "Items must have a picture URL";
  }
  if (data.price <= 0) {
    errors.price = "Must select a listing pric greater than 0";
  }
  return { errors, isValid: isEmpty(errors) };
};
