const Image = require('../model/image.js');
const PendingImage = require('../model/pending-image.js');
const generateSrcset = require('../utils/generate-srcset.js');

exports.getImages = async (req, res, next) => {
  try {
    const page = +(req.query.page || 1);
    const size = +(req.query.page || 20);
    if (!page || !size || page <= 0 || size <= 0) {
      return res.status(400).send('invalid page or size number');
    }

    const skip = size * (page - 1);
    let selectQuery = {};

    if (req.query.q) {
      const keywords = req.query.q.split(' ');
      selectQuery = { tags: { $in: keywords } };
    }

    const images = await Image.find(selectQuery)
      .sort({ _id: -1 })
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
    let image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).send('image not found');
    }

    image = image.toObject();

    delete image.publicId;
    delete image.likedBy;

    res.send(image);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

exports.likeImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
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

    res.send();
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

exports.unlikeImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
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

    res.send();
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

exports.postImageHook = async (req, res, next) => {
  try {
    if (req.body.notification_type === 'upload') {
      const tags = req.body.tags;
      const src = req.body.secure_url;
      const publicId = req.body.public_id;
      const pendingImage = await PendingImage.findOne({ publicId });
      let srcset = '';

      if (!pendingImage) {
        return res.status(422).send('invalid request');
      }

      if (req.body.moderation[0].status === 'approved') {
        // save the image and notify the user that the image is available
        srcset = generateSrcset(req.body.responsive_breakpoints[0].breakpoints);
        const image = new Image({
          src,
          srcset,
          tags,
          publicId,
          ownerId: pendingImage.userId
        });

        await image.save();

        // notify the user that the image is uploaded
      } else {
        // notify the user that is image is not approved
      }
      await pendingImage.remove();
    }
    res.end();
  } catch (e) {
    console.error(e);
    // notify the user that the server could not upload the image
    res.status(500).send();
  }
};
