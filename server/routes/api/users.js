const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User model
const User = require("../../models/User");

//  @route            GET api/users/test
//  @desc             Tests users route
//  @access           Public
router.get("/test", (req, res) => res.json({ message: "Users works!" }));

//  @route            POST api/users/register
//  @desc             Register user
//  @access           Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.json({ errors });
  }

  //Check to see if email is already in DB
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        //User already exists
        errors.email = "There is already an account with that email.";
        return res.json(errors);
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
                //generate token
                const payload = {
                  id: user.id,
                  name: user.firstName,
                  status: 101
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
              })
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

//  @route            POST api/users/login
//  @desc             Login user / Returning JWT token
//  @access           Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.json({ errors });
  }

  //Find user by email
  User.findOne({ email }).then(user => {
    //Check if user exists
    if (!user) {
      errors.email = "User not found";
      return res.json({ errors });
    }

    //Check password
    bcrypt.compare(password, user.password).then(match => {
      if (match) {
        //generate token
        const payload = {
          id: user.id,
          status: 101
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
        errors.password = "Password incorrect";
        return res.json({ errors });
      }
    });
  });
});

//  @route            GET api/users/current
//  @desc             Return current user
//  @access           Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let currentUser = {
      _id: req.user._id
    };
    res.json({ message: "success", user: currentUser });
  }
);

//  @route            GET api/users/profile
//  @desc             Return current users profile info
//  @access           Private
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let currentUser = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      shipping: req.user.shipping,
      pastOrders: req.user.pastOrders
    };
    res.json({ message: "success", user: currentUser });
  }
);

//  @route            PUT api/users/update
//  @desc             Update user info
//  @access           Private
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let password = req.body.password;
    // check password
    bcrypt.compare(password, req.user.password).then(match => {
      if (match) {
        User.findById(req.user._id).then(user => {
          let shipping = {
            street: req.body.user.shipping.street,
            city: req.body.user.shipping.city,
            state: req.body.user.shipping.state,
            zip: req.body.user.shipping.zip
          };
          user.email = req.body.user.email;
          user.shipping = shipping;
          user
            .save()
            .then(user => {
              res.json({ message: "Success", user });
            })
            .catch(err => {
              res.json({ messgae: "error", err });
            });
        });
      } else {
        let errors = "Password incorrect";
        return res.json({ errors });
      }
    });
  }
);

module.exports = router;
