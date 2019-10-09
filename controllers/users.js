const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    // cannot directly delete from req.user
    const profile = req.user.toObject();
    delete profile.googleId;
    delete profile.likedImages;
    res.send(profile);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

exports.getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send('user not found');
    }

    const publicProfile = user.toObject();
    delete publicProfile.likedImages;
    delete publicProfile.email;
    delete publicProfile.googleId;
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

exports.getUserImages = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send('user not found');
    }

    await user.populate('images').execPopulate();

    res.send(user.images);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

exports.getUserLikedImages = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send('user not found');
    }

    res.send(user.likedImages);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};
