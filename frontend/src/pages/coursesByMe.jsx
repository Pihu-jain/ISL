// Corrected component name with uppercase 'CoursesByMe'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyVidCourseCard from './MyVidCourseCard';

function CoursesByMe() {  // Capitalize this name
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

    console.log(user);
    
    
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/instructor/${user.username}`);
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchCourses();
  }, [user]);

  if (loading) return <p className="text-center mt-8 text-lg">Loading your courses...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length ? (
          courses.map(course => <MyVidCourseCard key={course._id} course={course} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">No courses created yet.</p>
        )}
      </div>
    </div>
  );
}

export default CoursesByMe;  // Export with uppercase 'CoursesByMe'
