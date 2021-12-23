const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const manageCtrl = require('../app/controllers/ManageController');

router.get('/add', manageCtrl.addVideo);
router.post('/store', manageCtrl.storeVideo);
router.get('/edit/:id', manageCtrl.editVideo);
router.get('/trash', manageCtrl.trashVideos);
router.post('/action-handler', manageCtrl.actionHandler);
router.put('/:id', manageCtrl.updateVideo);
router.patch('/restore/:id', manageCtrl.restoreVideo);
router.delete('/:id', manageCtrl.deleteVideo);
router.delete('/delete/:id', manageCtrl.removeVideo);
router.get('/', manageCtrl.index);

module.exports = router;
