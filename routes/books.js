const express = require("express");
const router = express.Router();
const { Book, validateBook } = require("../models/books");
const authenticate = require("../middlewares/authenticate");
const { isAdmin } = require("../middlewares/authorize");

//POST: CREATE A NEW BOOK
router.post("/", async (req, res) => {
  const error = await validateBook(req.body);
  if (error.message) res.status(400).send(error.message);

  book = new Book({
    name: req.body.bookName,
    author: {
      name: req.body.authorName,
      age: req.body.authorAge,
    },
    genre: req.body.genre,
  });

  book
    .save()
    .then((book) => {
      res.send(book);
    })
    .catch((error) => {
      res.status(500).send("Book was not stored in db");
    });
});

//GET ALL BOOKS
router.get("/", [authenticate, isAdmin], (req, res) => {
  Book.find()
    .then((books) => res.send(books))
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
});

//GET THE BOOK BY ID
router.get("/:bookId", async (req, res) => {
  const book = await Book.findById(req.params.bookId);
  if (!book) res.status(404).send("Book not found");
  res.send(book);
});

//UPDATE BOOK BASED ON ID
router.put("/:bookId", async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(
    req.params.bookId,
    {
      name: req.body.bookName,
      author: {
        name: req.body.authorName,
        age: req.body.authorAge,
      },
      genre: req.body.genre,
    },
    { new: true }
  );

  if (!updatedBook) res.status(404).send("book nont found");
  res.send(updatedBook);
});

//DELETE BOOK BASED ON ID
router.delete("/:bookId",isAdmin, async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.bookId);
  if (!book) res.status(404).send("book with id not found");
  res.send(book);
});

module.exports = router;
