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
//  @route            POST api/items/addNew
//  @desc             Creates new item
//  @access           Private
router.post("/addNew", (req, res) => {
  Admin.findOne({ userId: req.body.id })
    .then(admin => {
      //check stuff and things
      if (!admin) {
        return res.status(400).json({
          message:
            "You must be an admin to do that. Are you trying to hack me? Three strikes gets your IP reported. FYI"
        });
      }
      const { errors, isValid } = validateItemInput(req.body);
      //Check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      let newItem = new Item({
        name: req.body.name,
        desc: req.body.desc,
        img: req.body.img,
        category: req.body.category,
        qty: req.body.qty,
        price: req.body.price
      });
      newItem
        .save()
        .then(item =>
          res.json({ message: "successfully added a new item", item })
        )
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
