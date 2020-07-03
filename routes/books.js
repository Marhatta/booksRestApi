const Book  = require('../models/books');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//POST REQUEST
//POST A NEW BOOK TO DATABASE
router.post('/',(req,res) => {
    console.log("book",req.body)
    book = new Book({
        name:req.body.bookName,
        author:{
            name:req.body.authorName,
            age:req.body.authorAge
        },
        genre:req.body.genre
    });
    
    book.save().then((book) => {
        res.send(book);
    }).catch(error => {
        res.status(500).send('Book could not be added');
    })
});

module.exports = router;