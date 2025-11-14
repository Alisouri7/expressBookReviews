const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios')

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
public_users.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/books')
        res.status(200).json(response.data)
    } catch (err) {
        res.status(404).json({ message: 'error in get book list', err: err });
    }
})
public_users.get('/books', (req, res) => {
    return res.send(books)
})
// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}/books`)
        res.status(200).json(response.data)
    } catch (err) {
        res.status(404).json({ message: 'error in get book', err: err });
    }
});
public_users.get('/isbn/:isbn/books', (req, res) => {
    return res.send(books[req.params.isbn])
})
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}/books`)
        res.status(200).json(response.data)
    } catch (err) {
        res.status(404).json({ message: 'error in get book', err: err });
    }
});
public_users.get('/author/:author/books', (req, res) => {
    const author = req.params.author
    for (let i = 1; i < 11; i++) {
        if (books[i].author === author) {
            return res.status(200).send(books[i])
        }
    }
})
// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}/books`)
        res.status(200).json(response.data)
    } catch (err) {
        res.status(404).json({ message: 'error in get book', err: err });
    }
});
public_users.get('/title/:title/books', (req, res) => {
    const title = req.params.title
    for (let i = 1; i < 11; i++) {
        if (books[i].title === title) {
            return res.status(200).send(books[i])
        }
    }
})

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn
  res.send(JSON.stringify(books[isbn].reviews))
  return res.status(200).json({ message: "successful" });
});

module.exports.general = public_users;
