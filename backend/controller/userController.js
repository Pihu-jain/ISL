const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup Controller
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  if(!username || !email || !password){
    return res.status(400).json({message: 'All fields are required'});
  }

  try {
    // Check if user already exists

    const name = await User.findOne({username});
    if(name){
      return res.status(400).json({message: 'Username is taken'})
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role:'student',
    });

    // Send response with the created user
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    res.status(200).json({message:'ALl fields are required'})
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and send JWT token
    const token = jwt.sign({ id: user._id }, "jdhejkf", {
      expiresIn: '30d', // Token expiry duration
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const logoutUser = async(req,res) =>{
  res.status(200).json("logout successfully")
}

// // Get Logged-in User Data Controller
// const getMe = async (req, res) => {
//   try {
//     // Access the user from the request object (set by protect middleware)
//     const user = req.user;
//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user details by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user points (and course scores)
const getUserPoints = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      totalPoints: user.totalPoints,
      courseScores: user.courseQuizScores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Enroll user in a course
const enrollInCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    // Find course and add to user's enrolled courses
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Enroll user
    user.enrolledCourses.push(course);
    await user.save();
    res.status(200).json({ message: 'Successfully enrolled in course', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { signupUser, loginUser,logoutUser,getAllUsers, getUserById, getUserPoints, enrollInCourse };
