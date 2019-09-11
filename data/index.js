const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL || 'mongodb://localhost/Freemage';

mongoose.connect(DB_URL, {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', () => {
  console.error("couldn't connect to the database");
  process.exit(1);
});

db.once('open', () => console.log('connected to the database'));
