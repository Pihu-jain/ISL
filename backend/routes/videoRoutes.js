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


//admin Routes
router.delete('/:id', protect, adminOnly, deleteVideo);

//user routes
router.get('/:id',protect ,getVideoById);

module.exports = router;
