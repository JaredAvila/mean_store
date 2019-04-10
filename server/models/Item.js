const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  category: {
    type: String
  },
  qty: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sales: {
    dateOfSale: {
      type: Date
    },
    qty: {
      type: Number,
      default: 0
    },
    tot: {
      type: Number,
      default: 0
    }
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model("items", ItemSchema);
