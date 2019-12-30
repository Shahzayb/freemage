const cloudinary = require('cloudinary').v2;
const User = require('../model/user.js');
const Image = require('../model/image.js');

const conf = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
};

cloudinary.config(conf);

exports.getSignature = (req, res) => {
  console.log(req.query);

  const [folderName, userId, ...rest] = req.query.data.folder.split('/');

  if (
    rest.length ||
    folderName !== 'freemage' ||
    userId !== req.user.id.toString()
  ) {
    return res.status(422).send();
  }

  const signature = cloudinary.utils.api_sign_request(
    { ...req.query.data },
    conf.api_secret
  );

  console.log(signature);

  res.send(signature);
};

exports.postWebhook = async (req, res) => {
  try {
    const { body } = req;
    const userId = body.public_id.split('/')[1];

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(422).send();
    }

    if (body.notification_type === 'upload') {
      let image = await Image.findOne({ publicId: body.public_id });

      if (!image) {
        const filename =
          body.public_id.split('/')[2] +
          body.secure_url.match(/\.(jpg|jpeg)$/g)[0];

        image = new Image({
          publicId: body.public_id,
          tags: body.tags,
          ownerId: user,
          src: body.secure_url,
          filename
        });
      } else {
        image.tags = body.tags;
        image.ownerId = user;
      }
      await image.save();
    } else if (body.notification_type === 'moderation') {
      let image = await Image.findOne({ publicId: body.public_id });
      if (!image) {
        const filename =
          body.public_id.split('/')[2] +
          body.secure_url.match(/\.(jpg|jpeg)$/g)[0];

        image = new Image({
          publicId: body.public_id,
          filename,
          src: body.secure_url
        });
      }

      if (body.moderation_status === 'approved') {
        image.approved = true;
      } else {
        image.approved = false;
      }
      await image.save();
    }
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};
