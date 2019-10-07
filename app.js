const express = require('express');
const cors = require('cors');
const logger = require('morgan');
require('./data/index'); // connecting to database

const imagesRoute = require('./routes/images');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/api/images/', imagesRoute);
app.use('/api/auth/', authRouter);
app.use('/api/users/', usersRouter);

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
