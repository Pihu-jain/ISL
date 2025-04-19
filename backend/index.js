const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors());

// Routes
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/courses', require('./routes/courseRoute'));
// Add other routes as needed

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
    console.log('Connected to MongoDB'); 
    
  })
  .catch(err => console.error(err));
