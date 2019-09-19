const express = require('express');
const multer = require('multer');

const imageController = require('../controllers/images');
const cloudinaryUpload = require('../middlewares/cloudinaryUpload');
const bufferToDataUri = require('../middlewares/bufferToDataUri');

const router = express.Router();

const upload = multer();

router.post(
  '/',
  [
    upload.single('image'),
    (req, res, next) => {
      if (!req.file.mimetype.match(/^image\/jpe?g$/)) {
        // return res.status(422).send('invalid file type');
      } else if (req.file.buffer.length >= 5e7) {
        // if greater than 50mb
        return res.status(422).send('file is too large');
      } else if (req.file.size <= 0) {
        return res.status(422).send('invalid file size');
      }
      next();
    },
    bufferToDataUri,
    cloudinaryUpload
  ],
  imageController.postImage
);

router.get('/', imageController.getImages);

router.post('/hook', imageController.postImageHook);

module.exports = router;
