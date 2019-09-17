const Image = require('../models/image');

exports.getImages = async (req, res, next) => {
  const page = +(req.params.page || 1);
  const size = 10;
  if (!page) {
    return res.status(400).send('invalid page number');
  }
  const skip = size * (page - 1);
  try {
    const images = await User.find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(size);
    res.send(images);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

exports.postImage = async (req, res, next) => {
  try {
    const image = new Image({
      src: req.body.src,
      srcset: req.body.srcset,
      pendingModeration: req.body.pending
    });

    await image.save();
    res.status(201).send(image);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

exports.postModerationHook = (req, res, next) => {};
