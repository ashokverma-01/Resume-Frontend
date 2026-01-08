import React, { useEffect, useState } from "react";
import { useResume } from "../context/Resume/ResumeContext";
import { FiPlus, FiUpload, FiEdit } from "react-icons/fi";
import { Pencil, Trash2 } from "lucide-react";
import TopBar2 from "../utils/TopBar2";
import ResumeUploader from "../components/MediaButton/Download/ResumeUploader";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { getUserResumes, userResumes, resetResume, loading } = useResume();
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    getUserResumes();
  }, []);

  return (
    <div className="h-[calc(100vh-72px)] overflow-y-auto bg-gray-100">
      <div className="sticky top-0 z-50 no-print">
        <TopBar2 />
      </div>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-6 mb-6 flex-wrap">
          {/* Create Resume */}
          <div
            onClick={() => {
              resetResume();
              navigate("/resume");
            }}
            className="w-40 h-48 border-2 border-dashed border-blue-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition"
          >
            <div className="w-14 h-14 rounded-full bg-blue-400 flex items-center justify-center text-white text-2xl mb-3">
              <FiPlus />
            </div>
            <span className="font-medium text-gray-700">Create Resume</span>
          </div>

          {/* Upload Resume */}
          <div
            className="w-40 h-48 border-2 border-dashed border-purple-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 transition"
            onClick={() => setShowUpload(true)}
          >
            <div className="w-14 h-14 rounded-full bg-purple-400 flex items-center justify-center text-white text-2xl mb-3">
              <FiUpload />
            </div>
            <span className="font-medium text-gray-700">Upload Existing</span>
          </div>
          {showUpload && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4 sm:p-6">
              {/* Modal container */}
              <div className="relative bg-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-xl shadow-lg p-6 sm:p-8">
                {/* Close Icon */}
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
                  onClick={() => setShowUpload(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 text-center sm:text-left">
                  Upload Resume
                </h2>

                {/* Resume Upload Component */}
                <ResumeUploader onComplete={() => setShowUpload(false)} />
              </div>
            </div>
          )}
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Resume Cards */}
        {loading ? (
          <p className="text-gray-400 text-center">Loading resumes...</p>
        ) : (
          <div
            className="
    grid
    grid-cols-1        /* mobile */
    sm:grid-cols-2     /* small screens */
    md:grid-cols-3     /* tablets */
    lg:grid-cols-4     /* laptops */
    xl:grid-cols-5     /* large screens → 5 per row */
    gap-4 sm:gap-6
    justify-items-center
  "
          >
            {userResumes.map((resume) => (
              <div
                key={resume._id}
                className="
          group relative
          w-full max-w-[200px]
          h-72
          rounded-xl
          bg-gradient-to-br from-purple-50 to-purple-200
          border border-purple-300
          p-4
          flex flex-col items-center justify-between
          hover:shadow-xl
          transition
          cursor-pointer
        "
              >
                {/* 🔹 Top Right Icons */}
                <div
                  className="
            absolute top-3 right-3 flex gap-2
            opacity-100 sm:opacity-0
            scale-100 sm:scale-90
            sm:group-hover:opacity-100
            sm:group-hover:scale-100
            transition-all duration-200
          "
                >
                  <button
                    className="p-2 rounded-full bg-white shadow hover:bg-purple-100 text-purple-600"
                    onClick={() => navigate(`/resume/${resume._id}`)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button className="p-2 rounded-full bg-white shadow hover:bg-red-100 text-gray-600 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* 🔹 Center Icon */}
                <div className="mt-12 w-14 h-14 rounded-xl bg-purple-200 flex items-center justify-center text-purple-700 text-2xl">
                  <FiEdit />
                </div>

                {/* 🔹 Title */}
                <h3 className="text-center font-semibold text-purple-700 text-base sm:text-lg px-2">
                  {resume.title || "Update Resume"}
                </h3>

                {/* 🔹 Date */}
                <p className="text-xs sm:text-sm text-purple-500 mb-4">
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
