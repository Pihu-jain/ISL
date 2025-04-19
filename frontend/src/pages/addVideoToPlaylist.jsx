import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AddVideoToCourse = () => {
  const { courseId } = useParams();
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title || !video) return alert('Please provide a title and video.');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', video);

    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Assuming auth is needed

      await axios.post(`http://localhost:5000/api/courses/add-video/${courseId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Video added successfully!');
      setTitle('');
      setVideo(null);
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Add Video to Course</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Video Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            placeholder="Enter video title"
            required
          />
        </div> 

        <div>
          <label className="block mb-1 font-medium text-gray-700">Upload Video</label>
          <input
            type="file"
            accept="video/mp4"
            onChange={e => setVideo(e.target.files[0])}
            className="w-full border px-4 py-2 rounded bg-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Add Video'}
        </button>
      </form>
    </div>
  );
};

export default AddVideoToCourse;
