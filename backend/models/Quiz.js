const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionVideo: {
    url: { type: String, required: true },
    duration: { type: Number }
  },
  questionText: { type: String, required: true },
  options: {
    type: [{
      text: { type: String, required: true },
      isCorrect: { type: Boolean, required: true, default: false }
    }],
    validate: [arrayLimit, '{PATH} must have exactly 4 options']
  },
  points: { type: Number, default: 1 }
});

function arrayLimit(val) {
  return val.length === 4;
}

const quizSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    unique: true // One quiz per course
  },
  title: { type: String, required: true },
  description: { type: String },
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', quizSchema);