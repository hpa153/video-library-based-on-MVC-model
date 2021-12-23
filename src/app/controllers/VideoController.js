const Video = require("../models/Video");
const { singleObjectConverter } = require("../../util/mongoose");

class VideoController {
  // [GET] /videos
  index(req, res) {
    res.render('videos');
  }

  // [GET] /videos/:slug
  showVideo(req, res, next) {
    Video.findOne({slug: req.params.slug})
    .then(video => {
      res.render('./details/video-details', 
      { video: singleObjectConverter(video) })
    })
    .catch(next)
  }
}

module.exports = new VideoController;