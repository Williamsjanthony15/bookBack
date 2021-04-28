'use strict';

const mongoose = require('mongoose');
const express  = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (req, res) => {
  res.send('Welcome to my bookBack');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`)); 