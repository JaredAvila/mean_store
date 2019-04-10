const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const AdminSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Admin = mongoose.model("admins", AdminSchema);
