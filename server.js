'use strict';

const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const User = require('./models/user');

const userInformation = new User({
  email: 'Williamsjanthony15@yahoo.com',
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
  res.send('Welcome to my bookBack');
});

app.get('/books', (req, res) => {
  // res.send('User Model'); 
  User.find((err, dataBaseResults) => {
    console.log('Sick of results', dataBaseResults[0])
    res.send(dataBaseResults);
  });
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`));

