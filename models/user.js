const mongoose  = require("mongoose");

//USER SCHEMA
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = new mongoose.model('User',UserSchema);