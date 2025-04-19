import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import AddCourse from './pages/addCourse';
import AddVideo from './pages/addVideoToPlaylist';
import Playlist from './pages/playlist';
import CoursesByMe from './pages/coursesByMe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-video/:courseId" element={<AddVideo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/add-course" element={<AddCourse />} />
        <Route path="/playlist/:courseId" element={<Playlist />} />
        <Route path="/" element={<Playlist />} />
        <Route path="/admin/my-courses" element={<CoursesByMe />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
export default App;
