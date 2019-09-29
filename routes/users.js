const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/me', auth, usersController.getProfile);

router.get('/:id', usersController.getPublicProfile);

router.get('/:id/images', usersController.getImages);

module.exports = router;
