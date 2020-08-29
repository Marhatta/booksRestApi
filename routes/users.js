const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const SALT_ROUNDS = 12;

//create a new user
router.post("/", (req, res) => {
  //encrypt the password
  bcrypt.hash(req.body.password, SALT_ROUNDS, async (err, hash) => {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    let userCreated = await newUser.save();

    if (!userCreated) res.status(500).send("Could not create user");

    //create a json web token
    let jwtToken = jwt.sign(
      { name: req.body.name, email: req.body.email },
      "secret"
    );

    res.status(200).send({ userCreated: true, token: jwtToken });
  });
});

module.exports = router;
