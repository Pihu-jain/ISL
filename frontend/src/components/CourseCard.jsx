import React from 'react';
import { Link } from 'react-router-dom';


const MediaDisplay = ({ url }) => {
  const isVideo = url.endsWith('.mp4');
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


function CourseCard({ course }) {
  return (
    <div className="bg-white shadow p-4 rounded-md hover:shadow-lg transition">
      {/* Thumbnail Image */}
     
      {course.thumbnail && (
          <div className="flex justify-center mt-6 mb-10">
            <MediaDisplay url={course.thumbnail} />
          </div>
        )}

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>

      {/* Instructor & Category */}
      <p className="text-sm text-gray-600 mb-1">
        <strong>Instructor:</strong> {course.instructor}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Category:</strong> {course.category}
      </p>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-3">
        {course.description?.slice(0, 100)}
      </p>

      {/* Link to course detail */}
      <Link
        to={`/playlist/${course._id}`}
        className="inline-block text-purple-600 underline mt-2"
      >
        View Course
      </Link>
    </div>
  );
}

export default CourseCard;
