const express = require('express');
const logger = require('morgan');
const cors = require('cors');

/**
 * Custom .env cofiguration
 */
if (process.env.NODE_ENV !== 'production') {
  const path = require('path');
  require('dotenv').config({ path: path.join(__dirname, '/config/dev.env') });
}

require('./data/index'); // connecting to database

const imagesRoute = require('./routes/images.js');
const authRouter = require('./routes/auth.js');
const usersRouter = require('./routes/users.js');

const app = express();

app.use(cors());
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

if (process.env.NODE_ENV !== 'production') {
  // generic api 404
  app.use((req, res) => {
    res.status(404).send();
  });

  // generic global error handler
  app.use((err, req, res) => {
    console.log('error');
    res.status(500).send();
  });
}

const PORT = process.env.PORT || '5000';

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
