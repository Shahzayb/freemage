const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  publicId: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  srcset: {
    type: String,
    required: true
  },
  tags: [{ type: String }],
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
