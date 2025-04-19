const Quiz = require('../models/Quiz');
const Course = require('../models/Course');
const uploadToCloudinary = require('../utils/uploadOnCloudinary');

// Create a new quiz for a course
const createQuiz = async (req, res) => {
  try {
    const { courseId, title, description} = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const existingQuiz = await Quiz.findOne({ course: courseId });
    if (existingQuiz) {
      return res.status(400).json({ message: 'Quiz already exists for this course' });
    }

    const newQuiz = new Quiz({
      course: courseId,
      title,
      description,
    });

    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add a question to a quiz
const addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { questionText, options, points } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Question video is required' });
    }

    // Upload question video
    const uploadResult = await uploadToCloudinary(req.file.path);

    const newQuestion = {
      questionVideo: {
        url: uploadResult.secure_url,
        duration: uploadResult.duration
      },
      questionText,
      options: JSON.parse(options), 
      points: points || 1
    };

    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { $push: { questions: newQuestion } },
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get quiz by course ID
const getQuizByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const quiz = await Quiz.findOne({ course: courseId }).populate('course');
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for this course' });
    }
    
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Submit quiz answers and calculate score
const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; 
    
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let score = 0;
    let totalPossible = 0;
    
    answers.forEach(answer => {
      const question = quiz.questions.id(answer.questionId);
      if (question) {
        totalPossible += question.points;
        if (question.options[answer.selectedOptionIndex]?.isCorrect) {
          score += question.points;
        }
      }
    });

    const percentage = Math.round((score / totalPossible) * 100);
    const passed = percentage >= quiz.passingScore;

    res.status(200).json({
      score,
      totalPossible,
      percentage,
      passed,
      passingScore: quiz.passingScore
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createQuiz,
  addQuestion,
  getQuizByCourse,
  submitQuiz
};