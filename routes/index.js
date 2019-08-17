const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const isImage = require('is-image');
const imageRepo = require('../models/index');

const router = express.Router();

const upload = multer({
  fileFilter(req, file, cb) {
    if (!isImage(file.originalname)) {
      return res.status(400).send('invalid file');
    }
    cb(undefined, true);
  },
  limits: {
    fileSize: 1.4e7 // 14 mb
  }
});

router.post('/images', upload.single('image'), async (req, res, next) => {
  try {
    if (req.file.size <= 0) {
      return res.status(400).send('invalid file size');
    }
    const thumbnail = await sharp(req.file.buffer)
      .resize(400, 400)
      .png()
      .toBuffer();

    await imageRepo.saveImage(thumbnail, req.file.buffer, req.file.mimetype);
    res.status(201).send();
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
});

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
