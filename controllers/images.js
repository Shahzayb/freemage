const cloudinary = require('cloudinary').v2;

const Image = require('../model/image.js');

exports.getImages = async (req, res, next) => {
  try {
    const page = +(req.query.page || 1);
    const size = +(req.query.size || 20);
    if (!page || !size || page <= 0 || size <= 0) {
      return res.status(400).send('invalid page or size number');
    }

    const skip = size * (page - 1);
    let selectQuery = { approved: true };

    if (req.query.q) {
      const keywords = req.query.q
        .split(' ')
        .map(keyword => keyword.trim().toLowerCase());
      console.log(keywords);
      selectQuery.tags = {
        $in: keywords
      };
    }

    const images = await Image.find(selectQuery)
      .sort({
        _id: -1
      })
      .skip(skip)
      .limit(size);
    res.send(images);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

exports.getImageById = async (req, res) => {
  try {
    let image = await Image.findOne({ _id: req.params.id, approved: true });
    if (!image) {
      return res.status(404).send('image not found');
    }

    res.send(image);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

exports.likeImage = async (req, res) => {
  try {
    const image = await Image.findOne({ _id: req.params.id, approved: true });
    if (!image) {
      return res.status(404).send('image not found');
    }

    // req.user.id.constructor is String
    // image.likedBy[0].constructor is ObjectID

    if (!image.likedBy.includes(req.user.id)) {
      image.likedBy.push(req.user.id);
      req.user.likedImages.push(image.id);

      await image.save();
      await req.user.save();
    }

    res.send(image);
  } catch (e) {
    console.error(e);
    if (e.kind === 'ObjectId') {
      return res.status(404).send();
    }
    res.status(500).send();
  }
};

exports.unlikeImage = async (req, res) => {
  try {
    const image = await Image.findOne({ _id: req.params.id, approved: true });
    if (!image) {
      return res.status(404).send('image not found');
    }

    // req.user.id.constructor is String
    // image.likedBy[0].constructor is ObjectID

    if (image.likedBy.includes(req.user.id)) {
      image.likedBy = image.likedBy.filter(
        userId => req.user.id.toString() !== userId.toString()
      );
      req.user.likedImages = req.user.likedImages.filter(
        imageId => image.id.toString() !== imageId.toString()
      );

      await image.save();
      await req.user.save();
    }

    res.send(image);
  } catch (e) {
    console.error(e);
    if (e.kind === 'ObjectId') {
      return res.status(404).send();
    }
    res.status(500).send();
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findOne({ _id: req.params.id, approved: true });

    if (!image) {
      return res.status(404).send();
    }

    if (image.ownerId.toString() !== req.user.id.toString()) {
      return res.status(403).send('You can only delete your own images');
    }

    await image.remove();

    cloudinary.uploader
      .destroy(image.publicId)
      .then(console.log)
      .catch(console.log);

    res.status(204).send();
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(404).send();
    }
    console.error(e);
    res.status(500).send();
  }
};
