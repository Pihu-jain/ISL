import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function Playlist() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/playlist/${courseId}`);

        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div className="p-8 text-center text-lg">Loading...</div>;
  }

  if (!course) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">Course not found</h2>
        <Link to="/" className="text-blue-500 underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  const MediaDisplay = ({ url }) => {
    console.log('Media URL:', url); // Debugging line
    
    const isVideo = true;
    return isVideo ? (
      <video
        className="w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-300 hover:shadow-3xl transition-shadow duration-300"
        controls
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <img
        className="w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-300 object-cover hover:scale-105 transition-transform duration-300"
        src={url}
        alt="Media"
      />
    );
  };

  const playlistVideos = course.videos;
  console.log('Playlist Videos:', playlistVideos); // Debugging line

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{course.title} - Playlist</h1>

      {playlistVideos.length === 0 ? (
        <p className="text-gray-600">No videos in this playlist yet.</p>
      ) : (
        playlistVideos.map((video) => (
          <div
            key={video._id}
            className="mb-8 bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:space-x-6"
          >
            <div className="w-full md:w-64 rounded-md mb-4 md:mb-0">
              <MediaDisplay url={video.url} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{video.title}</h2>
              <p className="text-gray-700">{video.description}</p>
              {video.duration && (
                <p className="text-sm text-gray-500 mt-1">Duration: {video.duration} min</p>
              )}
            </div>
          </div>
        ))
      )}

      <Link to="/" className="inline-block mt-4 text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}
