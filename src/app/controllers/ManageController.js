const Video = require('../models/Video');
const { multipleObjectConverter } = require('../../util/mongoose');
const { singleObjectConverter } = require("../../util/mongoose");

class ManageController {
  // [GET] /manage
  index(req, res, next) {
    Promise.all([Video.find({}), Video.countDocumentsDeleted()])
      .then(([videos, deletedVideos]) =>
        res.render('manage', {
          deletedVideos,
          videos: multipleObjectConverter(videos),
        })
      )
      .catch(next)
  }

  // [GET] /manage/add
  addVideo(req, res, next) {
    res.render('./details/add');
  }

  // [GET] /manage/trash
  trashVideos(req, res, next) {
    Video.findDeleted({})
      .then(videos => {
        res.render('./details/trash', {
          videos: multipleObjectConverter(videos),
        })
      })
      .catch(next)
  }

  // [POST] /manage/store
  storeVideo(req, res, next) {
    req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
    const video = new Video(req.body);
    video.save()
      .then(() => res.redirect("/"))
      .catch(next)
  }

  // [GET] /manage/:id/editVideo
  editVideo(req, res, next) {
    Video.findById(req.params.id)
      .then(video => res.render('./details/edit', {
        video: singleObjectConverter(video),
      }))
      .catch(next);
  }

  // [PUT] /manage/:id
  updateVideo(req, res, next) {
    req.body.image =
      Video.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        description: req.body.description,
        image: `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`,
        videoId: req.body.videoId,
      })
        .then(() => res.redirect("/manage"))
        .catch(next)
  }

  // [DELETE] /manage/:id
  deleteVideo(req, res, next) {
    Video.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next)
  }

  // [DELETE] /manage/delete/:id
  removeVideo(req, res, next) {
    Video.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next)
  }

  // [PATCH] /manage/restore/:id
  restoreVideo(req, res, next) {
    Video.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next)
    Video.findOneAndUpdate({}, { $set: { deletedAt: '' } });
  }

  // [POST] /manage/action-handler
  actionHandler(req, res, next) {
    switch (req.body.action) {
      case 'delete': {
        Video.delete({ _id: { $in: req.body.videoIds } })
          .then(() => res.redirect("back"))
          .catch(next)
        break;
      }
      default: {
        req.json({ message: 'Invalid action! Please choose another action!' });
        break;
      }
    }
  }
}

module.exports = new ManageController;
