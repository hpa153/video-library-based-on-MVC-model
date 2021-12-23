const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Video = new Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  slug: { type: String, slug: "name", unique: true },
  videoId: { type: String, required: true },
}, {
  _id: false,
  timestamps: true,
});

// Query helpers
// Sort query
Video.query.sortColumn = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    const isValidType = ['asc', 'desc'].includes(req.query.type);

    return this.sort({
      [req.query.column]: isValidType ? req.query.type : 'desc',
    });
  }
  return this;
}

// Plugins
mongoose.plugin(slug);
Video.plugin(AutoIncrement);
Video.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model('Video', Video);
