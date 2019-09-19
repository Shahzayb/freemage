const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryUpload = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file, {
      moderation: 'aws_rek',
      categorization: 'aws_rek_tagging',
      auto_tagging: 0.5,
      notification_url: 'https://enikamgrvtodd.x.pipedream.net/', // 3rd party webhook endpoint
      folder: 'freemage',

      responsive_breakpoints: {
        create_derived: false,
        bytes_step: 2000,
        min_width: 200,
        max_width: 2500,
        transformation: {
          crop: 'fit'
        }
      }
    });

    req.body.publicId = result.public_id;

    next();
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

module.exports = cloudinaryUpload;
