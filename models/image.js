const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
