const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryUpload = async (req, res, next) => {
  try {
    const uploads = await Promise.all([
      cloudinary.uploader.upload(req.image, {
        folder: 'freemage'
      }),
      cloudinary.uploader.upload(req.thumbnail, {
        folder: 'freemage'
      })
    ]);

    req.image = uploads[0].secure_url;
    req.thumbnail = uploads[1].secure_url;

    next();
  } catch (e) {
    console.error('error', e);
    res.status(500).send();
  }
};

module.exports = cloudinaryUpload;
