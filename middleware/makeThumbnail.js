const sharp = require('sharp');

const makeThumbnail = async (req, res, next) => {
  if (req.file.size <= 0) {
    return res.status(400).send('invalid file size');
  }
  try {
    req.thumbnail = await sharp(req.file.buffer)
      .resize(400, 400)
      .png()
      .toBuffer();

    next();
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

module.exports = makeThumbnail;
