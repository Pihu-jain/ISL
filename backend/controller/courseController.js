const Course = require('../models/Course');
const Video = require('../models/Video');
const uploadToCloudinary = require('../utils/uploadOnCloudinary');

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().select('title category instructor thumbnail');
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching all courses:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(course);
    } catch (error) {
        console.error('Error fetching course by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new course (Admin only)
const createCourse = async (req, res) => {
    try {
        const { title, description, category, instructor } = req.body;
        const videoPath = req.file?.path;

        if (!videoPath) return res.status(400).json({ error: 'Video file is required' });

        const uploadedVideo = await uploadToCloudinary(videoPath);

        const newCourse = new Course({
            title,
            description,
            category,
            instructor,
            thumbnail: uploadedVideo.secure_url,
        });

        await newCourse.save();
        res.status(201).json({ message: 'Course created', course: newCourse });
    } catch (error) {
        console.error('Course upload failed:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addVideoToCourse = async (req, res) => {
    try {
        const { title } = req.body;
        const { courseId } = req.params;
        const videoPath = req.file?.path;

        if (!videoPath) return res.status(400).json({ error: 'Video file is required' });

        // Upload to Cloudinary
        const uploadedVideo = await uploadToCloudinary(videoPath);
        if (!uploadedVideo?.secure_url) {
            return res.status(500).json({ error: 'Video upload failed' });
        }

        // Create Video doc
        const newVideo = new Video({
            title,
            url: uploadedVideo.secure_url,
        });
        await newVideo.save();

        // Push to Course
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        course.videos.push(newVideo._id);
        await course.save();

        res.status(201).json({ message: 'Video added to course', video: newVideo });

    } catch (error) {
        console.error('Error adding video to course:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const fetchPlaylist = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId).populate('videos');
            

        if (!course) return res.status(404).json({ message: 'Course not found' });

        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};



const updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(updatedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete course (Admin only)
const deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, addVideoToCourse, fetchPlaylist };
