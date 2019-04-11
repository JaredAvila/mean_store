const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//load input validation
const validateItemInput = require("../../validation/newItem");

//Load models
const User = require("../../models/User");
const Item = require("../../models/Item");
const Admin = require("../../models/Admin");

//  @route            GET api/users/test
//  @desc             Tests users route
//  @access           Public
router.get("/test", (req, res) => res.json({ message: "Users works!" }));

//  @route            GET api/items/
//  @desc             Returns items array
//  @access           Public
router.get("/", (req, res) => {
  Item.find({})
    .then(items => {
      res.json({ message: "success", items });
    })
    .catch(err => {
      if (err) {
        return res
          .status(404)
          .json({ message: "error, no items found", error: err });
      }
    });
});

//  @route            POST api/items/item
//  @desc             Returns item by ID
//  @access           Public
router.post("/item", (req, res) => {
  Item.findOne({ _id: req.body.itemId })
    .then(item => {
      if (!item) {
        return res.status(404).json({ message: "error, item not found" });
      }
      res.json({ message: "success", item });
    })
    .catch(err => {
      if (err) {
        return res
          .status(404)
          .json({ message: "error, item not found", error: err });
      }
    });
});

//  @route            POST api/items/search
//  @desc             Returns items array for search query
//  @access           Public
router.post("/search", (req, res) => {
  //gets a case insensitive regular expression of name input
  const nameRegex = new RegExp(req.body.name, "i");
  //finds array of items that have a name "LIKE" input
  Item.find({ name: nameRegex })
    .then(items => {
      res.json({ message: "success", items });
    })
    //or it doesn't, returns error
    .catch(err => {
      if (err) {
        return res
          .status(404)
          .json({ message: "error, item not found", error: err });
      }
    });
});

//  @route            POST api/items/category
//  @desc             Returns items array by category
//  @access           Public
router.post("/category", (req, res) => {
  //Find items with matching category
  Item.find({ category: req.body.category })
    .then(items => {
      res.json({ message: "success", items });
    })
    .catch(err => {
      if (err) {
        return res.status(400).json({ message: "error", error: err });
      }
    });
});

module.exports = router;
