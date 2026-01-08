import React, { useState } from "react";
import { FiShare2, FiDownload, FiArrowLeft, FiGlobe } from "react-icons/fi";
import { EyeOff } from "lucide-react";
import { handleShare } from "../components/MediaButton/ShareButton/ShareButton";
import { handleDownload } from "../components/MediaButton/Download/Download";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/Resume/ResumeContext";

const TopBar = () => {
  const { resumeId } = useResume();
  const navigate = useNavigate();

  const [isPublic, setIsPublic] = useState(false);

  // Toggle public/share
  const togglePublic = () => setIsPublic((prev) => !prev);
  const resumeShareLink = `https://av-resume.vercel.app/public/${resumeId}`;

  return (
    <div className="border-b bg-gray-50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3">
        {/* LEFT: Back Button */}
        <div className="flex flex-shrink-0 gap-2 overflow-x-auto sm:overflow-visible">
          <button
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 text-gray-500 rounded-lg text-sm hover:bg-gray-300 transition whitespace-nowrap"
            onClick={() => navigate("/")}
          >
            <FiArrowLeft />
            Back
          </button>

          {/* MOBILE: Action buttons */}
          <div className="flex gap-2 sm:hidden">
            {/* Share button only when public */}
            {isPublic && (
              <button
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition"
                onClick={() => handleShare(resumeShareLink)}
              >
                <FiShare2 />
                Share
              </button>
            )}

            {/* Public Eye / Globe Toggle */}
            <button
              className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition whitespace-nowrap"
              onClick={togglePublic}
            >
              {isPublic ? <FiGlobe size={16} /> : <EyeOff size={16} />}
              Public
            </button>

            <button
              className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-600 rounded-lg text-sm hover:bg-green-200 transition whitespace-nowrap"
              onClick={handleDownload}
            >
              <FiDownload />
              Download
            </button>
          </div>
        </div>

        {/* DESKTOP: Action buttons */}
        <div className="hidden sm:flex flex-wrap gap-2 justify-end w-full sm:w-auto">
          {/* Share button */}
          {isPublic && (
            <button
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition border border-transparent hover:border-blue-500"
              onClick={() => handleShare()}
            >
              <FiShare2 />
              Share
            </button>
          )}

          {/* Public Eye / Globe Toggle */}
          <button
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition border border-transparent hover:border-purple-500"
            onClick={togglePublic}
          >
            {isPublic ? <FiGlobe size={16} /> : <EyeOff size={16} />}
            Public
          </button>

          <button
            className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-600 rounded-lg text-sm hover:bg-green-200 transition border border-transparent hover:border-green-500"
            onClick={handleDownload}
          >
            <FiDownload />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
