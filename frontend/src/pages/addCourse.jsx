import React, { useState } from 'react';
import axios from 'axios';

function AddCourse() {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    instructor: ''
  });
  const [video, setVideo] = useState(null);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();

    for (const key in courseData) {
      formData.append(key, courseData[key]);
    }

    if (video) {
      formData.append('video', video);
    }

    try {
      await axios.post('http://localhost:5000/api/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Course added successfully!');
    } catch (err) {
      console.error('Error creating course:', err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Course Title" onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <textarea name="description" placeholder="Description" onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input name="category" placeholder="Category" onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input name="instructor" placeholder="Instructor" onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input type="file" onChange={handleFileChange} accept="video/*" required className="w-full" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;
