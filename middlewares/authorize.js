const jwt = require("jsonwebtoken");

exports.isAdmin = function(req,res,next){
    let token = req.headers.authorization.split(' ')[1];
    if(!token) res.status(401).send("No token provided. You must be admin to do this task");

    jwt.verify(token,'secret', function (err, decoded){
        if(err) res.status(500).send("Failed to authenticate");
        next();
    })
}