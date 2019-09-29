const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    res.send(req.user);
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
