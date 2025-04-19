const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String },
  instructor:   { type: String , ref: 'User'},
  category:     { type: String, required: true },
  thumbnail:    { type: String },
  videos:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  quiz:         { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  createdAt:    { type: Date, default: Date.now },
  isPublished:  { type: Boolean, default: false }
});

module.exports = mongoose.model('Course', courseSchema);
