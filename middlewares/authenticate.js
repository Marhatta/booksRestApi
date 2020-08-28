const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = async function (req, res, next) {
  const currentUser = await User.findOne({ email: req.body.email });

  if (!currentUser) res.status(404).send("User not found");

  await bcrypt.compare(req.body.password, currentUser.password, function (
    err,
    result
  ) {
    if (err) res.send("something wrong happened", err);
    if (!result) res.status(401).send("Invalid email or password");
    next();
  });
};
