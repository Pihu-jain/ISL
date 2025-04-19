const Video = require('../models/Video');
const Course = require('../models/Course');
const uploadToCloudinary = require('../utils/cloudinary');

// Create video and upload file to Cloudinary
const createVideo = async (req, res) => {
  try {
    const { title, description, category, courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (!req.file) return res.status(400).json({ message: 'No video file uploaded' });

    const uploadResult = await uploadToCloudinary(req.file.path);

    const newVideo = new Video({
      title,
      description,
      url: uploadResult.secure_url,
      category,
      course: courseId,
    });

    await newVideo.save();
    course.videos.push(newVideo._id);
    await course.save();

    res.status(201).json(newVideo);
  } catch (error) {
    console.error("Video upload error:", error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getVideosByCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate('videos');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course.videos);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;

    const video = await Video.findByIdAndDelete(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // 2. Remove video from ALL courses that reference it (atomic operation)
    await Course.updateMany(
      { videos: videoId },  // Find courses containing this video
      { $pull: { videos: videoId } }  // Remove it
    );

    res.status(200).json({ 
      message: 'Video permanently deleted'
    });

  } catch (error) {
    res.status(500).json({ message: 'Failed to completely remove video' });
  }
};

module.exports = {
  createVideo,
  getVideosByCourse,
  getVideoById,
  deleteVideo
};
