import { useState, useEffect } from "react";
import { parseJSONField } from "../../utils/helper";
import { useResume } from "../../context/Resume/ResumeContext";
import { FiPlus, FiX, FiGlobe } from "react-icons/fi";

const Step8Language = ({ onNext, onBack }) => {
  const { resumeData, updateResumeData } = useResume();

  const [languageList, setLanguageList] = useState([]);
  const [languageInput, setLanguageInput] = useState("");

  useEffect(() => {
    const langs = Array.isArray(resumeData.languages)
      ? resumeData.languages
      : parseJSONField(resumeData.languages);
    setLanguageList(langs || []);
  }, [resumeData.languages]);

  const handleAddLanguage = () => {
    const trimmed = languageInput.trim();
    if (!trimmed) return;

    if (languageList.some((l) => l.toLowerCase() === trimmed.toLowerCase()))
      return;

    const updated = [...languageList, trimmed];
    setLanguageList(updated);
    setLanguageInput("");

    // 🔴 ONLY CONTEXT UPDATE
    updateResumeData({ languages: updated });
  };

  const handleRemoveLanguage = (lang) => {
    const updated = languageList.filter((l) => l !== lang);
    setLanguageList(updated);
    updateResumeData({ languages: updated });
  };

  const handleSubmit = () => {
    // 🔴 NO API CALL
    onNext({ languages: languageList });
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

      {/* Input Section - Stacked for Mobile */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="w-full">
          <input
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all shadow-sm"
            placeholder="Ex: English, Hindi, German"
            onKeyDown={(e) => e.key === "Enter" && handleAddLanguage()}
          />
        </div>

        <button
          onClick={handleAddLanguage}
          className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-semibold flex items-center justify-center gap-2 border border-blue-100 active:scale-[0.98]"
        >
          <FiPlus size={18} />
          Add Language
        </button>
      </div>

      {/* Language Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {languageList.length === 0 && (
          <p className="text-gray-400 text-sm italic py-2">
            No languages added yet.
          </p>
        )}
        {languageList.map((lang, i) => (
          <span
            key={i}
            className="bg-gray-50 text-gray-700 px-4 py-1.5 rounded-full flex items-center gap-2 text-sm border border-gray-200"
          >
            {lang}
            <button
              onClick={() => handleRemoveLanguage(lang)}
              className="p-0.5 hover:bg-red-100 rounded-full text-red-500 transition-colors"
            >
              <FiX size={14} />
            </button>
          </span>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-5 border-t border-gray-100 gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition border border-transparent hover:border-gray-400"
        >
          Back
        </button>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-600 rounded-lg text-sm hover:bg-green-200 transition border border-transparent hover:border-green-500"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Step8Language;
