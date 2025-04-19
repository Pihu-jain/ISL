const express = require('express');
const router = express.Router();
const quizController = require('../controller/quizController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const {createQuiz , addQuestion , getQuizByCourse , submitQuiz} = require('../controller/quizController')

// Admin routes
router.post('/', protect, adminOnly,createQuiz);
router.post('/:quizId/questions', protect, adminOnly, upload.single('questionVideo'),addQuestion);

// Student routes
router.get('/course/:courseId', protect,getQuizByCourse);
// router.post('/:quizId/submit', protect,submitQuiz);

module.exports = router;