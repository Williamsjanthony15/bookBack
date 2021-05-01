'use strict';

const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
app.use (cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const User = require('./models/user');

const userInformation = new User({
  email: 'williamsfamily121317@gmail.com',
  books: [{
    name: 'Kujo',
    description: 'Attack of a killer rabid dog',
    status: 'Recommend',
  },
  {
    name: 'Old Man and the Sea',
    description: 'Fishing Journey',
    status: 'Not Recommended',
  },
  {
    name: 'Federalist Papers',
    description: 'Historical Documents',
    status: 'Recommend',
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
app.get('/users/:email', (req, res) => {
  User.find({email: req.params.email}, (err, userInformation) => {
    console.log('IM here look at me', User)
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


app.listen(PORT, () => console.log(`Listening on ${PORT}`));

