const mongoose = require("mongoose");
const Author = require("./author");
const yup = require("yup");

//BOOK SCHEMA
const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  author: Author.schema,
  genre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
});

const validateBook = (book) => {
  let schema = yup.object().shape({
    bookName: yup
      .string()
      .required("Book Name is required")
      .min(3, "Should be a minimum of 3 chars")
      .max(50),
    authorName: yup.string().required().min(3).max(40),
    authorAge: yup
      .number()
      .required()
      .min(10, "Age should be greater than 10")
      .max(100),
    genre: yup.string().required().min(3).max(20),
  });

  return schema
    .validate(book)
    .then((book) => book)
    .catch((error) => {
      return { message: error.message };
    });
};

exports.Book = new mongoose.model("Book", BookSchema);
exports.validateBook = validateBook;
