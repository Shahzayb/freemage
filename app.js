const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');
const sslRedirect = require('heroku-ssl-redirect');

const app = express();

const env = app.get('env');

console.log('env:', env);

/**
 * Custom .env cofiguration
 */
if (env !== 'production') {
  const path = require('path');
  const config = {};
  if (env === 'test') {
    config.path = path.join(__dirname, '/config/test.env');
  } else {
    config.path = path.join(__dirname, '/config/dev.env');
  }
  require('dotenv').config(config);
}

if (env !== 'test') {
  require('./data/index'); // connecting to database
}
const imagesRoute = require('./routes/images.js');
const authRouter = require('./routes/auth.js');
const usersRouter = require('./routes/users.js');
const cloudinaryRouter = require('./routes/cloudinary.js');

// enable ssl redirect in production
app.use(sslRedirect());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(compression());

app.use('/api/images/', imagesRoute);
app.use('/api/auth/', authRouter);
app.use('/api/users/', usersRouter);
app.use('/api/cloudinary/', cloudinaryRouter);

if (env === 'production') {
  const path = require('path');

  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/client/build/index.html'))
  );
}

if (env !== 'test') {
  const PORT = process.env.PORT || '5000';

  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
} else {
  module.exports = app;
}
