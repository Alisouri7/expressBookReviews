const express = require('express');
let books = require("./booksdb.js");
const { stringify } = require('nodemon/lib/utils/index.js');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  res.send(JSON.stringify(books))
  return res.status(200).json({ message: "get all books in general module was succcessfully done." });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn
  res.send(JSON.stringify(books[isbn]))
  return res.status(200).json({ message: "get books based on isbn in general module was succcessfully done." });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author
  for (let i = 1; i < 11; i++) {
    if (books[i].author === author) {
      res.send(JSON.stringify(books[i]))
    }
  }
  return res.status(404).send(JSON.stringify({ message: 'book doesnt exist in DB!' }))
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title
    for (let i = 1; i < 11; i++) {
    if (books[i].title === title) {
      res.send(JSON.stringify(books[i]))
    }
  }
  return res.status(404).send(JSON.stringify({ message: 'book doesnt exist in DB!' }))
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
