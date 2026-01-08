import React, { useState, useEffect } from "react";
import { FiShare2, FiDownload, FiArrowLeft, FiGlobe } from "react-icons/fi";
import { EyeOff } from "lucide-react";
import { useParams } from "react-router-dom";
import { handleShare } from "../components/MediaButton/ShareButton/ShareButton";
import { handleDownload } from "../components/MediaButton/Download/Download";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/Resume/ResumeContext";

const TopBar = () => {
  const { resumeId, resumeData } = useResume();
  const { id: urlId } = useParams();
  const navigate = useNavigate();

  const [isPublic, setIsPublic] = useState(false);
  const togglePublic = () => setIsPublic((prev) => !prev);

  // Resume ID nikalne ka full-proof tarika
  const finalId = resumeId || resumeData?._id || urlId;

  const onShareClick = () => {
    // Debugging ke liye console log
    console.log("Final ID to share:", finalId);

    if (!finalId || finalId === "undefined" || finalId === "null") {
      alert("Resume link valid nahi hai! Shayad data load nahi hua.");
      return;
    }

    const resumeShareLink = `https://av-resume.vercel.app/public/${finalId}`;
    handleShare(resumeShareLink);
  };

  return (
    <div className="border-b bg-gray-50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3">
        {/* LEFT SECTION: Back Button */}
        <div className="flex flex-shrink-0 gap-2 overflow-x-auto sm:overflow-visible">
          <button
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 text-gray-500 rounded-lg text-sm hover:bg-gray-300 transition whitespace-nowrap"
            onClick={() => navigate("/")}
          >
            <FiArrowLeft />
            Back
          </button>

          {/* MOBILE ONLY: Action buttons */}
          <div className="flex gap-2 sm:hidden">
            {isPublic && (
              <button
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition"
                onClick={onShareClick}
              >
                <FiShare2 />
                Share
              </button>
            )}

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

        {/* DESKTOP ONLY: Action buttons */}
        <div className="hidden sm:flex flex-wrap gap-2 justify-end w-full sm:w-auto">
          {/* Share button (Ab fix ho gaya hai) */}
          {isPublic && (
            <button
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition border border-transparent hover:border-blue-500"
              onClick={onShareClick} // Yahan pehle handleShare() khali tha, ab onShareClick use ho raha hai
            >
              <FiShare2 />
              Share
            </button>
          )}

          {/* Public Toggle */}
          <button
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition border border-transparent hover:border-purple-500"
            onClick={togglePublic}
          >
            {isPublic ? <FiGlobe size={16} /> : <EyeOff size={16} />}
            Public
          </button>

          {/* Download Button */}
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
