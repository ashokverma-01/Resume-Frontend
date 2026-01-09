import React, { useState } from "react";
import { FiPlus, FiTrash2, FiGlobe } from "react-icons/fi";

const Step8Language = ({
  onNext,
  onBack,
  userData,
  setUserData,
  updateResumeData,
}) => {
  const [languageInput, setLanguageInput] = useState("");

  // Safety Check: Agar languages array nahi hai toh empty array use karein
  const languageList = Array.isArray(userData?.languages)
    ? userData.languages
    : [];

  const handleAddLanguage = () => {
    const trimmed = languageInput.trim();
    if (!trimmed) return;

    // Duplicate Check
    if (languageList.some((l) => l.toLowerCase() === trimmed.toLowerCase())) {
      setLanguageInput("");
      return;
    }

    const updated = [...languageList, trimmed];

    // LIVE UPDATE: Direct state update with safety
    setUserData((prev) => ({
      ...prev,
      languages: updated, // Direct override with new array
    }));

    setLanguageInput("");
  };

  const handleRemoveLanguage = (langToRemove) => {
    const updated = languageList.filter((l) => l !== langToRemove);

    setUserData((prev) => ({
      ...prev,
      languages: updated,
    }));
  };

  // Step8Language.jsx ke andar handleSubmit function
  const handleSubmit = async () => {
    try {
      // Latest languages ko object mein wrap karke bhejrein
      const finalData = { languages: languageList };

      // Dashboard ka handleNext call hoga
      await onNext(finalData);
    } catch (error) {
      console.error("Final Save Error:", error);
    }
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <FiGlobe size={20} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Languages
        </h2>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <input
          value={languageInput}
          onChange={(e) => setLanguageInput(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all shadow-sm"
          placeholder="Ex: English, Hindi"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddLanguage();
            }
          }}
        />

        <button
          type="button"
          onClick={handleAddLanguage}
          className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-semibold flex items-center justify-center gap-2 border border-blue-100"
        >
          <FiPlus size={18} /> Add Language
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 min-h-[40px]">
        {languageList.length === 0 ? (
          <p className="text-gray-400 text-sm italic">
            No languages added yet.
          </p>
        ) : (
          languageList.map((lang, i) => (
            <span
              key={i}
              className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full flex items-center gap-2 text-sm border border-gray-200 shadow-sm"
            >
              {lang}
              <button
                type="button"
                onClick={() => handleRemoveLanguage(lang)}
                className="text-red-500 hover:bg-red-50 rounded-full p-0.5"
              >
                <FiTrash2 size={14} />
              </button>
            </span>
          ))
        )}
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed border border-transparent hover:border-gray-400"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-500 text-white rounded-lg text-sm font-bold shadow-md hover:bg-green-600 transition-all"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Step8Language;
