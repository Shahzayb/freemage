const mongoose = require('mongoose');
const Image = require('./image');

const DB_URL = process.env.DB_URL || 'mongodb://localhost/Freemage';

mongoose.connect(DB_URL, {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', () => console.error("couldn't connect to the database"));
db.once('open', () => console.log('connected to the database'));

async function getImagesThumbnail(page = 1, size = 8) {
  const skip = size * (page - 1);

  return await Image.find(
    {},
    {
      thumbnail: 1
    }
  )
    .sort({ _id: -1 })
    .skip(skip)
    .limit(size);
}

async function saveImage(thumbnail, image) {
  image = new Image({
    thumbnail,
    image
  });
  return await image.save();
}

async function getImageById(id) {
  return await Image.findById(id, {
    image: 1
  });
}

module.exports = {
  getImagesThumbnail,
  saveImage,
  getImageById
};
