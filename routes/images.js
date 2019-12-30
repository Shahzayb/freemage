const express = require('express');

const imageController = require('../controllers/images.js');
const auth = require('../middlewares/authenticate.js');

const router = express.Router();

router.get('/', imageController.getImages);

router.get('/:id', imageController.getImageById);

router.patch('/:id/like', auth, imageController.likeImage);

router.patch('/:id/unlike', auth, imageController.unlikeImage);

router.delete('/:id', auth, imageController.deleteImage);

module.exports = router;
