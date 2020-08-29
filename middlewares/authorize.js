const jwt = require("jsonwebtoken");

exports.isAdmin = function (req, res, next) {
  let token = req.headers.authorization.split(" ")[1];
  //Bearer 12431231231hfsdgf6tr21rgeydfsaghf
  if (!token)
    res.status(401).send("No token found, you must be admin to do this task");

  jwt.verify(token, "secret", function (err, decoded) {
    if (err) res.status(401).send("Unauthorized");

    next();
  });
};
