const Image = require('../models/Image');
const PendingImage = require('../models/PendingImage');
const generateSrcset = require('../utils/generateSrcset');

exports.getImages = async (req, res, next) => {
  const page = +(req.query.page || 1);
  const size = +(req.query.page || 20);
  if (!page || !size || page <= 0 || size <= 0) {
    return res.status(400).send('invalid page or size number');
  }
  const skip = size * (page - 1);
  try {
    const images = await Image.find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(size);
    res.send(images);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

exports.postPendingImage = async (req, res, next) => {
  try {
    // publicId is private until the image is approved
    const pendingImage = new PendingImage({
      publicId: req.body.publicId
    });

    await pendingImage.save();
    res.status(203).send();
  } catch (e) {
    console.log(e);
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
          publicId
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
