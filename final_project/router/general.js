const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (!username || !password) {
    return res.status(404).json({ message: 'please enter username and/or password.' })
  }
  if (!isValid(username)) {
    users.push({ "username": username, "password": password })
    return res.status(201).json({ message: "User successfully registered. Now you can login" });
  } else {
    return res.status(404).json({ message: "User already exists!" });
  }
});

// Get the book list available in the shop
public_users.get('/', (req, res) => {
  new Promise((resolve, reject) => {
    if (req) {
      resolve('promise fullfield')
    } else {
      reject('promise rejected')
    }
  })
    .then((message) => {
      res.status(200).send(JSON.stringify(books))
      console.log(message);
      return res.end()
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ message: "get all books in general module was failed." });
    })
})

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  new Promise((resolve, reject) => {
    if (req) {
      resolve('promise fullfield')
    } else {
      reject('promise rejected')
    }
  })
    .then((message) => {
      console.log(message);
      const isbn = req.params.isbn
      res.status(200).send(JSON.stringify(books[isbn]))
      return res.end()
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ message: "get all books in general module was failed." });
    })
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
  const isbn = req.params.isbn
  res.send(JSON.stringify(books[isbn].reviews))
  return res.status(200).json({ message: "successful" });
});

module.exports.general = public_users;
