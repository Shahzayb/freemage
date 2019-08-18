const Datauri = require('datauri');
const datauri = new Datauri();
const path = require('path');

const bufferToDataUri = async (req, res, next) => {
  try {
    req.image = datauri.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer
    ).content;

    req.thumbnail = datauri.format('.png', req.thumbnail).content;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

module.exports = bufferToDataUri;
