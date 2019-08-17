const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  thumbnail: {
    type: Buffer,
    required: true
  },
  image: {
    type: Buffer,
    required: true
  },
  thumbnailMime: {
    type: String,
    required: true
  },
  imageMime: {
    type: String,
    required: true
  }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
