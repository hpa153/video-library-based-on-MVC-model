const express = require('express');
const router = express.Router();
const videoCtrl = require('../app/controllers/VideoController');

router.get('/:slug', videoCtrl.showVideo);
router.get('/', videoCtrl.index);

module.exports = router;