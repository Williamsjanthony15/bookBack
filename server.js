'use strict';

const mongoose = require('mongoose');
const express = require('express');
const app = express();

require('dotenv').config();
app.use(express.json());
//only used with Postman
// app.use(express.urlencoded({extended:true}));


const PORT = process.env.PORT || 3001;

const cors = require('cors');
app.use (cors());


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const User = require('./models/user');

const userInformation = new User({
  // email: 'williamsfamily121317@gmail.com',
  // books: [{
  //   name: 'Kujo',
  //   description: 'Attack of a killer rabid dog',
  //   status: 'Recommended',
  // },
  // {
  //   name: 'Old Man and the Sea',
  //   description: 'Fishing Journey',
  //   status: 'Recommended',
  // },
  // {
  //   name: 'Federalist Papers',
  //   description: 'Historical Documents',
  //   status: 'Recommended',
  // }]
  email: 'matt.santorsola@gmail.com',
  books: [{
    name: 'The Meditations',
    description: 'Thoughts of a Roman Emperor',
    status: 'Recommended',
  },
  {
    name: 'Fortune\'s Formula',
    description: 'how much to bet?',
    status: 'Recommended',
  },
  {
    name: 'A Farewell to Arms',
    description: 'A Hemingway classic',
    status: 'Recommended',
  }]
});

userInformation.save(function (err) {
  if (err) console.err(err);
  else console.log('Added User');
});

app.get('/', (req, res) => {
  User.find((arr, userData) => {
    res.send(userData);
  });
});

// colon at the start of :email makes it a parameter
//gets user information based up the email
app.get('/users/:email', (req, res) => {
  User.find({email: req.params.email}, (err, userInformation) => {
    console.log('IM here look at me', userInformation);
    res.send(userInformation);
  });
});

app.get('/books', (req, res) => {
  const user = req.query.email;
  console.log('this is where im at', user);
  User.find({email: user}, (err, userInformation) => {
    res.send(userInformation[0]);
  });
});

app.post('/books', (req, res) => {
  const {email, name, description, status} = req.body;
  const newBook = {name, description, status};
  console.log(newBook);
  console.log(email);
  User.find({email}, (err, userInformation) => {
    if (!userInformation.length){
      res.status(400).send('user does not exist');
    } else {
      userInformation[0].books.push(newBook);
      userInformation[0].save().then(res.send(userInformation[0].books));
      console.log(userInformation[0].books);
    }
    
  });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

