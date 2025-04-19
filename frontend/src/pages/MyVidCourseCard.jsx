import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MediaDisplay = ({ url }) => {
  const isVideo = url.endsWith('.mp4');
  return isVideo ? (
    <video className="w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-300" controls>
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : (
    <img
      className="w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-300 object-cover"
      src={url}
      alt="Media"
    />
  );
};

function MyVidCourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow p-4 rounded-md hover:shadow-lg transition flex flex-col justify-between">
      {course.thumbnail && (
        <div className="flex justify-center mt-4 mb-6">
          <MediaDisplay url={course.thumbnail} />
        </div>
      )}
      <div>
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Instructor:</strong> {course.instructor}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Category:</strong> {course.category}
        </p>
        <p className="text-gray-700 text-sm mb-3">{course.description?.slice(0, 100)}</p>
        <Link
          to={`/playlist/${course._id}`}
          className="inline-block text-purple-600 underline mb-3"
        >
          View Course
        </Link>
      </div>

      <button
        onClick={() => navigate(`/add-video/${course._id}`)}
        className="mt-2 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
      >
        Add Video TO Course
      </button>
    </div>
  );
}

export default MyVidCourseCard;
