import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth status on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-purple-600">
          ISLingo
        </Link>

        {/* Center Nav */}
        <nav className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">
            Home
          </Link>
          <Link to="/quizzes" className="text-gray-700 hover:text-purple-600 font-medium">
            Quizzes
          </Link>
          <Link to="/playlist/123" className="text-gray-700 hover:text-purple-600 font-medium">
            Courses
          </Link>
        </nav>

        {/* Right Nav */}
        <div className="space-x-4">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              {/* Profile Dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-1">
                  <UserCircleIcon className="h-8 w-8 text-gray-600" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/admin/add-course"
                          className={`block px-4 py-2 text-sm rounded ${
                            active ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                          }`}
                        >
                          Add Course
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/admin/my-courses/"
                          className={`block px-4 py-2 text-sm rounded ${
                            active ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                          }`}
                        >
                          My courses
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={`block px-4 py-2 text-sm rounded ${
                            active ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                          }`}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
