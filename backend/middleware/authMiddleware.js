const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      console.log("User not found in DB");
      return res.status(401).json({ message: "User not found" });
    }
    
    next();
  } catch (err) {
    res.status(401).json({ 
      message: "Invalid token",
      error: err.message 
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only' });
  }
};

module.exports = { protect, adminOnly };
