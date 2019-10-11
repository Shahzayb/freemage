const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profilePic: {
    type: String,
    required: true
  },
  likedImages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
});

UserSchema.virtual('images', {
  ref: 'Image',
  localField: '_id',
  foreignField: 'ownerId'
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
