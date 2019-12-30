const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');

/**
 * Custom .env cofiguration
 */
if (process.env.NODE_ENV !== 'production') {
  const path = require('path');
  require('dotenv').config({ path: path.join(__dirname, '/config/dev.env') });
}

require('./data/index'); // connecting to database
// require('./stream'); // init notification stream

const imagesRoute = require('./routes/images.js');
const authRouter = require('./routes/auth.js');
const usersRouter = require('./routes/users.js');
const cloudinaryRouter = require('./routes/cloudinary.js');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(compression());

app.use('/api/images/', imagesRoute);
app.use('/api/auth/', authRouter);
app.use('/api/users/', usersRouter);
app.use('/api/cloudinary/', cloudinaryRouter);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/client/build/index.html'))
  );
}

const PORT = process.env.PORT || '5000';

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
