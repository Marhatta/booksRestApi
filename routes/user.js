const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

const SALT_ROUNDS = 12;
//create a user
router.post("/", (req, res) => {
  //generate password hash
  bcrypt.hash(req.body.password, SALT_ROUNDS, async (err, hash) => {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    let userCreated = await newUser.save();
    if (!userCreated) res.status(500).send("Could not create user");
    res.send(userCreated);
  });
});

module.exports = router;
