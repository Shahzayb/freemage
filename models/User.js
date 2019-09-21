const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    required: true
  }
});

UserSchema.virtual('images', {
  ref: 'Image',
  localField: '_id',
  foreignField: 'ownerId'
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
