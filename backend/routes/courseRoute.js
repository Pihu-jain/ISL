const express = require('express');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addVideoToCourse,
    fetchPlaylist,
} = require('../controller/courseController.js');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/',upload.single('video'), createCourse);

// add video to course
router.post('/add-video/:courseId', upload.single('video'), addVideoToCourse); 
router.get('/playlist/:courseId', fetchPlaylist);

// router.put('/:id', protect, adminOnly, updateCourse);
// router.delete('/:id', protect, adminOnly, deleteCourse);

module.exports = router;
