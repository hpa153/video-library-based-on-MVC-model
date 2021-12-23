const express = require('express');
const router = express.Router();
const sitesCtrl = require('../app/controllers/SitesController');

router.get('/search', sitesCtrl.search);
router.post('/search', sitesCtrl.searchResult);
router.get('/', sitesCtrl.home);

module.exports = router;