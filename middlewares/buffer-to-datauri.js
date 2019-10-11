const Datauri = require('datauri');
const path = require('path');

const datauri = new Datauri();

const bufferToDataUri = async (req, res, next) => {
  try {
    req.file = datauri.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer
    ).content;

    next();
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

module.exports = bufferToDataUri;
