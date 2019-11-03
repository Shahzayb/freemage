const cloudinary = require('cloudinary').v2;
const PendingImage = require('../model/pending-image.js');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryUpload = async (req, res, next) => {
  const pendingImage = new PendingImage({
    publicId: 'freemage/' + req.user.id,
    userId: req.user.id
  });

  cloudinary.uploader
    .upload(req.file, {
      public_id: pendingImage._id.toString(),
      moderation: 'aws_rek',
      categorization: 'aws_rek_tagging',
      auto_tagging: 0.4,
      async: true,
      notification_url:
        process.env.CLOUDINARY_WEBHOOK_URL ||
        'https://ent7diyacvjam.x.pipedream.net/', // 3rd party webhook endpoint
      folder: 'freemage/' + req.user.id,

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

      pendingImage.publicId =
        pendingImage.publicId + '/' + pendingImage._id.toString();

      console.log('upload result', result);
      return pendingImage.save();
    })
    .catch(e => {
      console.error('upload error', e);
      if (e.http_code !== 404) {
        // upload error
      } else {
        // moderation error : notify the user
      }
    });

  res.status(202).send();
};

module.exports = cloudinaryUpload;
