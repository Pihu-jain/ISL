const express = require('express');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  fetchPlaylist,
  addVideoToCourse,
  getCoursesByInstructor
} = require('../controller/courseController.js');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

//admin Routes
router.post('/',protect , adminOnly, upload.single('video'), createCourse);
router.put('/:id',updateCourse);
router.delete('/:id', deleteCourse);
router.post('/add-video/:courseId', upload.single('video'), addVideoToCourse); 


//user routes
router.get('/',getAllCourses);
router.get('/:id', getCourseById);
router.get('/playlist/:courseId',protect, fetchPlaylist);
router.get('/instructor/:instructor', getCoursesByInstructor);

module.exports = router;
