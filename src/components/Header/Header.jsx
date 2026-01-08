import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/Auth/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="
              text-2xl font-bold
              text-transparent
              bg-clip-text
              bg-gradient-to-r
              from-pink-500 via-purple-500 to-blue-500
              hover:from-pink-600 hover:via-purple-600 hover:to-blue-600
              transition
            "
          >
            AV-Resume
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span
                  className="
    text-transparent bg-clip-text
    bg-gradient-to-r
    from-blue-400
    via-purple-500
    via-pink-500
    to-orange-400
    font-semibold
    transition-all duration-300
    hover:from-blue-500
    hover:via-purple-600
    hover:via-pink-600
    hover:to-orange-500
    text-sm sm:text-base
  "
                >
                  Hi, {user.fullName}
                </span>

                <button
                  onClick={handleLogout}
                  className="
                    inline-flex items-center gap-2
                    px-4 py-2
                    bg-red-100 text-red-600
                    rounded-lg
                    text-sm font-medium
                    transition
                    hover:bg-red-200 hover:border-red-500
                    focus:outline-none focus:ring-2 focus:ring-red-300
                    active:scale-95
                  "
                >
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-200 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden transition-all duration-300 ease-in-out">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <span
                    className="
                    text-transparent bg-clip-text
                    bg-gradient-to-r from-blue-400 to-blue-600
                    font-semibold
                    hover:from-blue-500 hover:to-blue-700
                    block w-full text-left px-3 py-2 rounded-md text-base
                  "
                  >
                    Hi, {user.fullName}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="
                      w-full flex items-center gap-2
                      px-3 py-2
                      bg-red-100 text-red-600
                      rounded-md
                      text-base font-medium
                      hover:bg-red-200 hover:border-red-500
                      transition
                    "
                  >
                    <FiLogOut /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
