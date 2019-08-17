const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const errorHandler = require('strong-error-handler');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// 404
app.use((req, res) => {
  res.status(404).send();
});

// global error handler
app.use(
  errorHandler({
    debug: app.get('env') === 'development',
    log: true
  })
);

module.exports = app;
