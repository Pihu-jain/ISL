const express = require('express');
const {
  createVideo,
  getVideosByCourse,
  getVideoById,
  deleteVideo,
} = require('../controller/videoController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', protect, adminOnly, upload.single('video'), createVideo);
router.get('/course/:courseId', getVideosByCourse);
router.get('/:id', getVideoById);
router.delete('/:id', protect, adminOnly, deleteVideo);

module.exports = router;
