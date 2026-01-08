import { useState, useEffect } from "react";
import { parseJSONField } from "../../utils/helper";
import { useResume } from "../../context/Resume/ResumeContext";

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
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Languages</h2>

      <div className="flex gap-2 mb-3">
        <input
          value={languageInput}
          onChange={(e) => setLanguageInput(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
          placeholder="English, Hindi"
          onKeyDown={(e) => e.key === "Enter" && handleAddLanguage()}
        />
        <button
          onClick={handleAddLanguage}
          className="px-4 bg-blue-100 rounded"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {languageList.map((lang, i) => (
          <span key={i} className="bg-gray-200 px-3 py-1 rounded-full">
            {lang}
            <button
              onClick={() => handleRemoveLanguage(lang)}
              className="ml-2 text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="px-4 py-2 bg-gray-200 rounded">
          Back
        </button>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Step8Language;
