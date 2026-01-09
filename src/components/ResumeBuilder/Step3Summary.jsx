import React from "react";
import { FiEdit3 } from "react-icons/fi";

// Props mein userData aur setUserData add karein
const Step3Summary = ({
  onNext,
  onBack,
  userData,
  setUserData,
  updateResumeData,
}) => {
  // LIVE CHANGE: Direct parent state update
  const handleChange = (e) => {
    const value = e.target.value;
    setUserData((prev) => ({
      ...prev,
      summary: value,
    }));
  };

  const handleNextAction = () => {
    // Context persistence
    updateResumeData({ summary: userData.summary });
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

      {/* Input Field - Ab ye direct userData.summary se linked hai */}
      <div className="mb-8">
        <textarea
          value={userData?.summary || ""}
          onChange={handleChange} // Har stroke par dashboard update hoga
          rows={6}
          placeholder="e.g. Passionate Software Engineer with 5+ years of experience..."
          className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all resize-none"
        />
        <div className="flex justify-end mt-2">
          <span
            className={`text-[10px] font-bold uppercase ${
              (userData?.summary?.length || 0) > 200
                ? "text-green-500"
                : "text-gray-400"
            }`}
          >
            {userData?.summary?.length || 0} Characters
          </span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed border border-transparent hover:border-gray-400"
        >
          Back
        </button>

        <button
          onClick={handleNextAction}
          className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-600 rounded-lg text-sm hover:bg-green-200 transition border border-transparent hover:border-green-500"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
};

export default Step3Summary;
