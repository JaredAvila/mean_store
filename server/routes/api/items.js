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

//  @route            GET api/items/all
//  @desc             Returns items array
//  @access           Public
router.get("/all", (req, res) => {
  Item.find({})
    .then(items => {
      res.json({ message: "success", items });
    })
    .catch(err => console.log(err));
});

module.exports = router;
