import React, { useState } from "react";
import { FiShare2, FiDownload, FiArrowLeft, FiGlobe } from "react-icons/fi";
import { EyeOff } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { handleShare } from "../components/MediaButton/ShareButton/ShareButton";
import { handleDownload } from "../components/MediaButton/Download/Download";
import { useResume } from "../context/Resume/ResumeContext";

const TopBar = () => {
  const { resumeId, resumeData } = useResume();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isPublic, setIsPublic] = useState(false);
  const togglePublic = () => setIsPublic((prev) => !prev);

  const finalId = resumeId || resumeData?._id || id;

  const onShareClick = () => {
    if (!finalId || finalId === "undefined" || finalId === "null") {
      alert(
        "Resume link valid nahi hai! Please wait karein ya resume save karein."
      );
      return;
    }

    const resumeShareLink = `https://av-resume.vercel.app/public/${finalId}`;
    handleShare(resumeShareLink);
  };

  return (
    <div className="border-b bg-gray-50 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* LEFT: Back Button */}
        <div className="flex-shrink-0">
          <button
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
            onClick={() => navigate("/")}
          >
            <FiArrowLeft size={18} />
            <span className="hidden xs:inline">Back</span>
          </button>
        </div>

        {/* RIGHT: Actions (Scrollable on very small screens) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {isPublic && (
            <button
              className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 border border-transparent hover:border-blue-400 transition-all"
              onClick={onShareClick}
            >
              <FiShare2 size={16} />
              <span className="hidden sm:inline">Share</span>
            </button>
          )}

          <button
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border border-transparent ${
              isPublic
                ? "bg-purple-100 text-purple-600 hover:bg-purple-200 hover:border-purple-400"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:border-gray-400"
            }`}
            onClick={togglePublic}
          >
            {isPublic ? <FiGlobe size={16} /> : <EyeOff size={16} />}
            <span>{isPublic ? "Public" : "Private"}</span>
          </button>

          <button
            className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-green-100 text-green-600 rounded-lg text-sm font-medium hover:bg-green-200 border border-transparent hover:border-green-400 transition-all"
            onClick={handleDownload}
          >
            <FiDownload size={16} />
            <span className="hidden xs:inline">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
