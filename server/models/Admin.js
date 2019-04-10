const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const AdminSchema = new Schema({
  superAdmin: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  admins: [
    {
      id: {
        type: String
      },
      name: {
        type: String
      },
      email: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Admin = mongoose.model("admins", AdminSchema);
