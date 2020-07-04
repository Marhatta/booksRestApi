const mongoose = require('mongoose');
const Author = require('./author');


//BOOK SCHEMA
const BookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    author:Author.schema,
    genre:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20
    }
});


module.exports = new mongoose.model('Book',BookSchema);
