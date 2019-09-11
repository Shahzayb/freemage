const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true
  },
  srcset: {
    type: String,
    required: true
  }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
