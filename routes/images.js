const express = require('express');
const multer = require('multer');

const imageController = require('../controllers/images.js');
const cloudinaryUpload = require('../middlewares/cloudinary-upload.js');
const bufferToDataUri = require('../middlewares/buffer-to-datauri.js');
const auth = require('../middlewares/authenticate.js');

const router = express.Router();

const upload = multer();

router.post('/', auth, [
  upload.single('image'),
  (req, res, next) => {
    if (!req.file.mimetype.match(/^image\/jpe?g$/)) {
      return res.status(422).send('invalid file type');
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
]);

router.get('/', imageController.getImages);

router.post('/hook', imageController.postImageHook);

router.get('/:id', imageController.getImageById);

router.patch('/:id/like', auth, imageController.likeImage);

router.patch('/:id/unlike', auth, imageController.unlikeImage);

router.delete('/:id', auth, imageController.deleteImage);

module.exports = router;
