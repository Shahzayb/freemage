const express = require('express');
const multer = require('multer');

const imageController = require('../controllers/images');
const cloudinaryUpload = require('../middlewares/cloudinaryUpload');
const bufferToDataUri = require('../middlewares/bufferToDataUri');

const router = express.Router();

const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.mimetype.match(/^image\/jpe?g$/)) {
      return cb(new Error('invalid file'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5e7 // 50 mb
  }
});

router.post(
  '/',
  [
    upload.single('image'),
    (req, res, next) => {
      if (req.file.size <= 0) {
        return res.status(400).send('invalid file size');
      }
      next();
    },
    bufferToDataUri,
    cloudinaryUpload
  ],
  imageController.postImage
);

router.get('/', imageController.getImages);

module.exports = router;
