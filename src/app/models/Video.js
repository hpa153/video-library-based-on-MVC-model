const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Video = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  slug: { type: String, slug: "name", unique: true },
  videoId: { type: String, required: true },
}, {
  timestamps: true,
});

mongoose.plugin(slug);
Video.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt : true });

module.exports = mongoose.model('Video', Video);