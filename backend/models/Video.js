const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  url:         { type: String, required: true },
  duration:    { type: Number },
  course:      { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, default:null },
  comments:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema);
