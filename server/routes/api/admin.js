const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//load input validation
const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");
const validateItemInput = require("../../validation/newItem");

//Load models
const User = require("../../models/User");
const Admin = require("../../models/Admin");
const Item = require("../../models/Item");

//  @route            POST api/admin/login
//  @desc             Login user / Returning JWT token
//  @access           Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //Find user by email
  User.findOne({ email }).then(user => {
    //Check if user exists
    if (!user) {
      errors.admin = "Invalid credentials";
      return res.status(404).json(errors);
    }
    //Check if user is Admin
    if (user.status !== 301) {
      errors.admin = "Must register as an admin";
      return res.status(404).json(errors);
    }
    //Check password
    bcrypt.compare(password, user.password).then(match => {
      if (match) {
        //generate token
        const payload = {
          id: user.id,
          name: user.firstName,
          status: 301
        };
        //sign the token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ message: "success", token: "Bearer " + token });
          }
        );
      } else {
        errors.admin = "Invalid credentials";
        return res.status(400).json(errors);
      }
    });
  });
});

//  @route            POST api/admin/register
//  @desc             Register admin account
//  @access           Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Check to see if email is already in DB
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        //User already exists
        errors.email = "There is already an account with that email.";
        return res.status(400).json(errors);
        //user does not exist. Register user.
      } else {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          status: 301
        });
        //hash the password before storing data
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const newAdmin = new Admin({
                  user,
                  userId: user._id
                });
                newAdmin
                  .save()
                  .then(admin => res.json({ message: "success", admin }))
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

//  @route            POST api/admin/addNew
//  @desc             Creates new item
//  @access           Private
router.post(
  "/addNew",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //check if logged in user is an admin
    if (req.user.status != 301) {
      return res.status(400).json({
        message: "error",
        error: "You must be an admin to do that"
      });
    }
    const { errors, isValid } = validateItemInput(req.body);
    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //create new item and save
    let newItem = new Item({
      name: req.body.name,
      desc: req.body.desc,
      img: req.body.img,
      category: req.body.category,
      price: req.body.price
    });
    newItem
      .save()
      .then(item =>
        res.json({ message: "successfully added a new item", item })
      )
      .catch(err => console.log(err));
  }
);

//  @route            PUT api/admin/editItem
//  @desc             Edits an item
//  @access           Private
router.put(
  "/editItem",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //check if logged in user is an admin
    if (req.user.status !== 301) {
      return res
        .status(400)
        .json({ message: "error", error: "You must be an admin to do that" });
    }
    const { errors, isValid } = validateItemInput(req.body);
    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //Find the item and update it
    Item.findOne({ _id: req.body.itemId })
      .then(item => {
        //if no item found return with status error
        if (!item) {
          return res
            .status(404)
            .json({ message: "error", error: "Item not found" });
        }
        //else update item and return it
        item.name = req.body.name;
        item.desc = req.body.desc;
        item.img = req.body.img;
        item.category = req.body.category;
        item.price = req.body.price;
        item.save().catch(err => console.log(err));
        res.json({ message: "success", item });
      })
      .catch(err => console.log(err));
  }
);
//  @route            DELETE api/admin/removeItem
//  @desc             Deletes an item
//  @access           Private
router.delete(
  "/removeItem",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //check if logged in user is an admin
    if (req.user.status !== 301) {
      return res
        .status(400)
        .json({ message: "error", error: "You must be an admin to do that" });
    }
    //find item and delete it
    Item.findByIdAndDelete(req.body.itemId)
      .then(res.json({ message: "successfully deleted item" }))
      .catch(err => console.log(err));
  }
);

module.exports = router;
