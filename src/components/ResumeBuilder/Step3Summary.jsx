import React, { useState, useEffect } from "react";
import { useResume } from "../../context/Resume/ResumeContext";

const Step3Summary = ({ onNext, onBack }) => {
  const { resumeData, updateResumeData } = useResume();
  const [summary, setSummary] = useState(resumeData.summary || "");

  // Sync with context (Back button or external updates)
  useEffect(() => {
    setSummary(resumeData.summary || "");
  }, [resumeData.summary]);

  // Save summary to context and move to next step
  const handleNext = () => {
    updateResumeData({ summary });
    onNext();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>

      <div className="mb-6">
        <label className="block text-gray-700 mb-1">Summary</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={5}
          placeholder="Write a brief professional summary..."
          className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Navigation Buttons */}
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
