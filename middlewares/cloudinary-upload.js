const cloudinary = require('cloudinary').v2;
const PendingImage = require('../model/pending-image.js');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryUpload = async (req, res, next) => {
  cloudinary.uploader
    .upload(req.file, {
      moderation: 'aws_rek',
      categorization: 'aws_rek_tagging',
      auto_tagging: 0.5,
      notification_url:
        process.env.CLOUDINARY_WEBHOOK_URL ||
        'https://ent7diyacvjam.x.pipedream.net/', // 3rd party webhook endpoint
      folder: 'freemage',

      responsive_breakpoints: {
        create_derived: true,
        bytes_step: 1000,
        min_width: 200,
        max_width: 2500,
        max_images: 30
      }
    })
    .then(result => {
      // publicId is private until the image is approved
      const pendingImage = new PendingImage({
        publicId: result.public_id
      });
      console.log('upload result', result);
      return pendingImage.save();
    })
    .catch(e => {
      console.error(e);
      // user notify : server error
    });

  res.status(202).send();
};

module.exports = cloudinaryUpload;
