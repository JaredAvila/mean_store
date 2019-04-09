const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const AdminSchema = new Schema({
  superAdmin: {
    type: Object,
    required: true
  },
  admins: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Admin = mongoose.model("admins", AdminSchema);
