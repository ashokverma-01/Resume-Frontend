import React, { useEffect, useState } from "react";
import { useResume } from "../context/Resume/ResumeContext";
import { FiPlus, FiUpload, FiEdit } from "react-icons/fi";
import { Pencil, Trash2, X } from "lucide-react";
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
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex-shrink-0 z-50 no-print">
        <TopBar2 />
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* 🔹 Top Action Section: Responsive Grid */}
          <div className="grid grid-cols-2 xs:grid-cols-2 md:flex md:flex-wrap gap-3 sm:gap-6 mb-8">
            {/* Create Resume */}
            <div
              onClick={() => {
                resetResume();
                navigate("/resume");
              }}
              className="flex-1 min-w-[140px] md:w-40 h-40 sm:h-48 border-2 border-dashed border-blue-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all active:scale-95 bg-white shadow-sm"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl sm:text-2xl mb-2 sm:mb-3">
                <FiPlus />
              </div>
              <span className="font-semibold text-xs sm:text-sm text-gray-700">
                Create New
              </span>
            </div>

            {/* Upload Resume */}
            <div
              onClick={() => setShowUpload(true)}
              className="flex-1 min-w-[140px] md:w-40 h-40 sm:h-48 border-2 border-dashed border-purple-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 hover:border-purple-400 transition-all active:scale-95 bg-white shadow-sm"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl sm:text-2xl mb-2 sm:mb-3">
                <FiUpload />
              </div>
              <span className="font-semibold text-xs sm:text-sm text-gray-700">
                Upload PDF
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-lg font-bold text-gray-800">My Resumes</h2>
            <div className="h-[1px] flex-1 bg-gray-200"></div>
          </div>

          {/* 🔹 Resumes Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500 font-medium">
                Fetching your resumes...
              </p>
            </div>
          ) : userResumes.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <p className="text-gray-400">
                No resumes found. Create your first one!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {userResumes.map((resume) => (
                <div
                  key={resume._id}
                  className="group relative w-full h-64 sm:h-72 rounded-2xl bg-white border border-gray-200 p-4 flex flex-col items-center justify-between hover:shadow-2xl hover:border-purple-300 transition-all duration-300"
                >
                  {/* 🔹 Floating Icons (Visible on Mobile, Hover on Desktop) */}
                  <div className="absolute top-3 right-3 flex gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-2 rounded-lg bg-white shadow-md hover:bg-purple-50 text-purple-600 border border-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/resume/${resume._id}`);
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-white shadow-md hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-100 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Icon Area */}
                  <div className="mt-8 w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <FiEdit size={28} />
                  </div>

                  {/* Text Details */}
                  <div className="text-center w-full px-2">
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-1 mb-1">
                      {resume.title || "Untitled Resume"}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-400">
                      Edited: {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Mobile-only Bottom Link */}
                  <button
                    onClick={() => navigate(`/resume/${resume._id}`)}
                    className="w-full py-2 mt-2 sm:hidden bg-purple-600 text-white text-xs rounded-lg font-medium"
                  >
                    Edit Resume
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Modern Modal Overlay */}
      {showUpload && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-[100] p-0 sm:p-4 transition-opacity">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 relative animate-in slide-in-from-bottom duration-300">
            <button
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:text-red-500 transition"
              onClick={() => setShowUpload(false)}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Upload Resume
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Select your existing PDF or Word file to sync
            </p>

            <ResumeUploader onComplete={() => setShowUpload(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
