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
  price: {
    type: Number,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model("items", ItemSchema);
