import React, { useState, useEffect } from "react";
import { useResume } from "../../context/Resume/ResumeContext";
import { FiEdit3 } from "react-icons/fi";

const Step3Summary = ({ onNext, onBack }) => {
  const { resumeData, updateResumeData } = useResume();
  const [summary, setSummary] = useState(resumeData.summary || "");

  // Sync with context
  useEffect(() => {
    setSummary(resumeData.summary || "");
  }, [resumeData.summary]);

  const handleNext = () => {
    updateResumeData({ summary });
    onNext();
  };

  return (
    <div className="bg-white p-5 sm:p-7 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 max-w-md mx-auto">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <FiEdit3 size={20} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Summary</h2>
      </div>

      <p className="text-xs sm:text-sm text-gray-500 mb-5 leading-relaxed">
        Write a short and punchy summary of your professional journey to grab
        attention.
      </p>

      {/* Input Field */}
      <div className="mb-8">
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={6}
          placeholder="e.g. Passionate Software Engineer with 5+ years of experience in building scalable web applications..."
          className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm sm:text-base focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-gray-400 resize-none shadow-inner"
        />
        <div className="flex justify-end mt-2">
          <span
            className={`text-[10px] font-bold uppercase ${
              summary.length > 200 ? "text-green-500" : "text-gray-400"
            }`}
          >
            {summary.length} Characters
          </span>
        </div>
      </div>

      {/* 🔹 Responsive Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition border border-transparent hover:border-gray-400"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-600 rounded-lg text-sm hover:bg-green-200 transition border border-transparent hover:border-green-500"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
};

export default Step3Summary;
