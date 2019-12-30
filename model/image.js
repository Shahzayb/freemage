const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  publicId: {
    type: String,
    required: true,
    unique: true
  },
  tags: { type: [String], index: true },
  src: { type: String },
  filename: { type: String },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  approved: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
