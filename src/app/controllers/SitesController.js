/* Controller for single pages without subpages */
const Video = require('../models/Video');
const { multipleObjectConverter } = require('../../util/mongoose');

class SitesController {
  // [GET] /search
  search(req, res) {
    res.render('search');
  }

  // [POST] /search
  searchResult(req, res, next) {
    res.send(req.body.key);
  }

  // [GET] /
  home(req, res, next) {
    Video.find({})
      .then(videos => {
        res.render('home', {
          videos: multipleObjectConverter(videos),
        })
      })
      .catch(next)
  }
}

module.exports = new SitesController;