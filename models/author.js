const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    age:{
        type:Number,
        required:true,
        min:10
    }
});


module.exports = mongoose.model('Author',AuthorSchema);