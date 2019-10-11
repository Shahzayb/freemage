const express = require('express');
const logger = require('morgan');

/**
 * Custom .env cofiguration
 */
if (process.env.NODE_ENV !== 'production') {
  const path = require('path');
  require('dotenv').config({ path: path.join(__dirname, './config/dev.env') });
}

require('./data/index'); // connecting to database

const imagesRoute = require('./routes/images');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const cors = require('cors');
  app.use(cors());
}

app.use(logger('dev'));
app.use(express.json());

app.use('/api/images/', imagesRoute);
app.use('/api/auth/', authRouter);
app.use('/api/users/', usersRouter);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/client/build/index.html'))
  );
}

// generic api 404
app.use((req, res) => {
  res.status(404).send();
});

// generic global error handler
app.use((err, req, res) => {
  console.log('error');
  res.status(500).send();
});

const PORT = process.env.PORT || '5000';

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
