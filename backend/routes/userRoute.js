const express = require('express');
const { signupUser, loginUser, getAllUsers,
    getUserById,
    enrollInCourse,
    getUserPoints, } = require('../controller/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

router.get('/', protect, adminOnly, getAllUsers); 
router.get('/:userId', protect, getUserById);
// router.get('/:userId/points', protect, getUserPoints);
// router.put('/:userId/enroll/:courseId', protect, enrollInCourse);
// router.get('/me', protect, getMe);

module.exports = router;
