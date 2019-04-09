const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//Load User model
const User = require("../../models/User");

//  @route            GET api/users/test
//  @desc             Tests users route
//  @access           Public
router.get("/test", (req, res) => res.json({ message: "Users works!" }));

//  @route            GET api/users/register
//  @desc             Register user
//  @access           Public
router.post("/register", (req, res) => {
  //Check to see if email is already in DB
  User.findOne({ email: req.body.email })
    .then(user => {
      console.log(user);
      if (user) {
        //User already exists
        return res
          .status(400)
          .json({ message: "error", email: "Email already exists" });
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
              .then(user => res.json({ message: "success", user }))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

//  @route            GET api/users/login
//  @desc             Login user / Returning JWT token
//  @access           Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    //Check if user exists
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //generate token
        res.json({ message: "Success" });
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
