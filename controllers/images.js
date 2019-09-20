const Image = require('../models/Image');
const PendingImage = require('../models/PendingImage');
const generateSrcset = require('../utils/generateSrcset');

exports.getImages = async (req, res, next) => {
  const page = +(req.query.page || 1);
  const size = 10;
  if (!page) {
    return res.status(400).send('invalid page number');
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

exports.postImage = async (req, res, next) => {
  try {
    const pendingImage = new PendingImage({
      publicId: req.body.publicId
    });

    await pendingImage.save();
    res.status(201).send(pendingImage);
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
        await pendingImage.remove();

        return res.status(201).send(image);
      } else {
        // remove the image & notify the user that is image is not approved
        await pendingImage.remove();
        return res.status(422).send('image is not approved');
      }
    }
    res.end();
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

exports.postImageDownloads = async (req, res) => {
  const _id = req.body._id;
  if (!_id) {
    return res.status(422).send('id is required');
  }
  try {
    await Image.findByIdAndUpdate({ _id }, { $inc: { downloads: 1 } });
    return res.send();
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};
