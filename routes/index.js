const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const isImage = require('is-image');
const imageRepo = require('../models/index');
const cloudinaryUpload = require('../middleware/cloudinaryUpload');
const bufferToDataUri = require('../middleware/bufferToDataUri');
const makeThumbnail = require('../middleware/makeThumbnail');

const router = express.Router();

const upload = multer({
  fileFilter(req, file, cb) {
    if (!isImage(file.originalname)) {
      return res.status(400).send('invalid file');
    }
    cb(undefined, true);
  },
  limits: {
    fileSize: 5e7 // 50 mb
  }
});

router.post(
  '/images',
  upload.single('image'),
  makeThumbnail,
  bufferToDataUri,
  cloudinaryUpload,
  async (req, res, next) => {
    try {
      await imageRepo.saveImage(req.thumbnail, req.image);
      res.status(201).send();
    } catch (e) {
      console.error(e);
      return res.status(500).send();
    }
  }
);

router.get('/images/thumbnail', async (req, res, next) => {
  try {
    const page = +(req.query.page || 1);
    const size = +(req.query.size || 8);
    if (!isFinite(page) || !isFinite(size) || page < 1 || size < 1) {
      return res.status(400).send('invalid page or size');
    }

    const images = await imageRepo.getImagesThumbnail(page, size);
    res.json(images);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

router.get('/images/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const image = await imageRepo.getImageById(id);

    if (!image) {
      return res.status(404).send('image not found');
    }

    res.send(image);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

module.exports = router;
