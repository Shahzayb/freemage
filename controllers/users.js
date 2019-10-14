const User = require('../model/user.js');

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
    const page = +(req.query.page || 1);
    const size = +(req.query.page || 20);
    if (!page || !size || page <= 0 || size <= 0) {
      return res.status(400).send('invalid page or size number');
    }

    const skip = size * (page - 1);

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send('user not found');
    }
    console.log(user.images);
    await user
      .populate({
        path: 'images',
        model: 'Image',
        options: {
          // sort: { _id: -1 },
          skip,
          limit: size
        }
      })
      .execPopulate();

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
