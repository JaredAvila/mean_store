const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    default: 101
  },
  cart: [
    {
      itemId: {
        type: String,
        required: true
      },
      qty: {
        type: Number,
        required: true
      }
    }
  ],
  pastOrders: [
    {
      name: {
        type: String,
        required: true
      },
      desc: {
        type: String,
        required: true
      },
      qty: {
        type: Number,
        required: true
      },
      totalPrice: {
        type: Number,
        required: true
      },
      purchaseDate: {
        type: Date,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
