const mongoose = require('mongoose');

const PendingImageSchema = new mongoose.Schema({
  publicId: {
    type: String,
    required: true
  }
});

const PendingImage = mongoose.model('PendingImage', PendingImageSchema);

module.exports = PendingImage;
