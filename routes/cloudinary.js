const express = require('express');
const cloudinaryController = require('../controllers/cloudinary.js');
const auth = require('../middlewares/authenticate.js');
const validateHook = require('../middlewares/validate-cloudinary-webhook.js');

const router = express.Router();

router.get('/signature', auth, cloudinaryController.getSignature);

router.post('/webhook', validateHook, cloudinaryController.postWebhook);

module.exports = router;
