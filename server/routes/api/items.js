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

//  @route            POST api/items/addToCart
//  @desc             Updates all item qtys in users cart array
//  @access           Private
router.post(
  "/addToCart",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = req.user;
    Item.findOne({ _id: req.body.itemId })
      .then(item => {
        //add itemId and quantity to users cart
        user.cart.push({ itemId: item._id, qty: req.body.qty });
        user.save().catch(err => {
          if (err) return res.status(400).json({ message: "error", err });
        });
        res.json({ message: "success" });
      })
      .catch(err => res.status(400).json({ message: "error", error: err }));
  }
);

//  @route            POST api/items/checkout
//  @desc             Updates item sales and user pastOrders
//  @access           Private
router.post(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const loggedInUser = req.user;
    let { pastOrders, cart } = loggedInUser;
    const { itemId, qty, cartItemId } = req.body;
    if (cart.length === 0) {
      return res.status(400).json({ message: "error, nothing in cart" });
    }
    Item.findOne({ _id: itemId }).then(item => {
      if (!item)
        return res.status(404).json({ message: "error, Item not found" });
      let tot = qty * item.price;
      let newSale = {
        dateOfSale: new Date(),
        qty,
        tot
      };
      item.sales.push(newSale);
      item.save().catch(err => {
        if (err) return res.status(400).json({ message: "error", err });
      });
      User.findOne({ _id: loggedInUser.id })
        .then(user => {
          let order = {
            name: item.name,
            desc: item.desc,
            qty: newSale.qty,
            totalPrice: newSale.tot,
            purchaseDate: newSale.dateOfSale
          };
          pastOrders.push(order);
          for (let i = 0; i < cart.length; i++) {
            if (cart[i]._id == cartItemId) {
              cart.splice(i, 1);
            }
          }
          user.pastOrders = pastOrders;
          user.cart = cart;
          user
            .save()
            .then(user => res.json({ message: "success", user }))
            .catch(err => {
              if (err) return res.status(400).json({ message: "error", err });
            });
        })
        .catch(err => {
          if (err) return res.status(400).json({ message: "error", err });
        });
    });
  }
);

module.exports = router;
