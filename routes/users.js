const express = require('express');
const usersController = require('../controllers/users.js');
const auth = require('../middlewares/authenticate.js');

const router = express.Router();

router.get('/me', auth, usersController.getProfile);

router.get('/:id', usersController.getPublicProfile);

router.get('/:id/images', usersController.getUserImages);

router.get('/:id/likes', usersController.getUserLikedImages);

router.get('/', usersController.searchUsers);

module.exports = router;
