const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryUpload = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file, {
      moderation: 'webpurify',
      notification_url: 'https://env5fi3zsmad.x.pipedream.net/', // 3rd party webhook endpoint
      folder: 'freemage',
      responsive_breakpoints: {
        create_derived: false,
        bytes_step: 20000,
        min_width: 200,
        max_width: 2000,
        transformation: {
          crop: 'fit'
        }
      }
    });

    let srcset = '';

    // generate 'srcset' string from breakpoints

    for (let breakpoint of result.responsive_breakpoints[0].breakpoints) {
      srcset += breakpoint.secure_url + ` ${breakpoint.width}w,`;
    }

    req.body.srcset = srcset.replace(/,$/, '');
    req.body.src = result.secure_url;
    req.body.pending = true;

    next();
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

module.exports = cloudinaryUpload;
