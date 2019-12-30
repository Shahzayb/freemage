const User = require('../model/user.js');

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

    res.send(user);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

exports.getUserImages = async (req, res) => {
  try {
    const page = +(req.query.page || 1);
    const size = +(req.query.size || 20);
    if (!page || !size || page <= 0 || size <= 0) {
      return res.status(400).send('invalid page or size number');
    }

    const skip = size * (page - 1);

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send('user not found');
    }

    await user
      .populate({
        path: 'images',
        options: {
          sort: { _id: -1 },
          skip,
          limit: size
        }
      })
      .execPopulate();

    res.send(user.images);
  } catch (e) {
    console.error(e);
    if (e.kind === 'ObjectId') {
      return res.status(404).send('user not found');
    }
    res.status(500).send();
  }
};

exports.getUserLikedImages = async (req, res) => {
  try {
    const page = +(req.query.page || 1);
    const size = +(req.query.size || 20);
    if (!page || !size || page <= 0 || size <= 0) {
      return res.status(400).send('invalid page or size number');
    }

    const skip = size * (page - 1);

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send('user not found');
    }

    await user
      .populate({
        path: 'likedImages',
        options: {
          sort: { _id: -1 },
          skip,
          limit: size
        }
      })
      .execPopulate();

    res.send(user.likedImages);
  } catch (e) {
    console.error(e);
    if (e.kind === 'ObjectId') {
      return res.status(404).send('user not found');
    }
    res.status(500).send();
  }
};
