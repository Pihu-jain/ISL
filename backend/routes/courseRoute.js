const express = require('express');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  fetchPlaylist,
  addVideoToCourse
} = require('../controller/courseController.js');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

//admin Routes
router.post('/',protect , adminOnly ,upload.single('video'), createCourse);
router.put('/:id', protect, adminOnly, updateCourse);
router.delete('/:id', protect, adminOnly, deleteCourse);
router.post('/add-video/:courseId',protect , adminOnly, upload.single('video'), addVideoToCourse); 


//user routes
router.get('/',getAllCourses);
router.get('/:id',protect, getCourseById);
router.get('/playlist/:courseId',protect, fetchPlaylist);

module.exports = router;
