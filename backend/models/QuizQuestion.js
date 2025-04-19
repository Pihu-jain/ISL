const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  videoUrl:      { type: String, required: true },
  options:       [{ type: String, required: true }],
  correctOption: { type: String, required: true },
  explanation:   { type: String }
});

module.exports = mongoose.model('QuizQuestion', quizQuestionSchema);
