const express = require('express');
const path = require('path');
const logger = require('morgan');
require('./data/index'); // connecting to database

const imagesRoute = require('./routes/images');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/api/images/', imagesRoute);

// generic 404
app.use((req, res) => {
  res.status(404).send();
});

// generic global error handler
app.use((err, req, res) => {
  console.log('error');
  res.status(500).send();
});

module.exports = app;
