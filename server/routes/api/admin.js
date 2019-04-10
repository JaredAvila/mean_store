const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//load input validation
const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");

//Load models
const User = require("../../models/User");
const Admin = require("../../models/Admin");

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
    Admin.findOne({ userId: user._id }).then(admin => {
      if (!admin) {
        errors.admin = "Must register as an admin";
        return res.status(404).json(errors);
      }
    });
    //Check password
    bcrypt.compare(password, user.password).then(match => {
      if (match) {
        //generate token
        const payload = {
          id: user.id,
          name: user.firstName
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
          password: req.body.password
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

module.exports = router;
