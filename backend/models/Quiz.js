const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  course:    { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizQuestion' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', quizSchema);
    