const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL || 'mongodb://localhost/Freemage';

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .catch(err => {
    console.error("couldn't connect to the database", err);
    process.exit(1);
  });

const db = mongoose.connection;

db.on('error', err => {
  console.log(err);
});

db.on('open', () => console.log('connected to the database'));
