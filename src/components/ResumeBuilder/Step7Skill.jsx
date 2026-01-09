import React, { useState } from "react";
import { FiPlus, FiTrash2, FiZap } from "react-icons/fi";

const Step7Skill = ({
  onNext,
  onBack,
  userData,
  setUserData,
  updateResumeData,
}) => {
  // Local input ke liye sirf state rakhein (ye preview mein nahi jata)
  const [skillInput, setSkillInput] = useState("");

  // Data seedha userData se fetch karein
  const skillList = userData.skills || [];

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;

    // Case-insensitive check taaki duplicate skills na ho
    if (skillList.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setSkillInput("");
      return;
    }

    const updatedSkills = [...skillList, trimmed];

    // LIVE UPDATE: Parent state update karein
    setUserData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));

    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skillList.filter((s) => s !== skillToRemove);

    // LIVE UPDATE: Parent state update karein
    setUserData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  };

  const handleNextAction = () => {
    // Context persistence for database
    updateResumeData({ skills: skillList });
    onNext();
  };

  return (
    <div className="bg-white p-5 sm:p-7 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <FiZap size={20} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Skills</h2>
      </div>

      {/* Input Section */}
      <div className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="e.g. React, Node.js, Python"
          className="w-full border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all shadow-sm"
          onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
        />

        <button
          onClick={handleAddSkill}
          className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-semibold flex items-center justify-center gap-2 border border-blue-100"
        >
          <FiPlus size={18} />
          Add Skill
        </button>
      </div>

      {/* Skills Showcase - Direct mapping from parent data */}
      <div className="flex flex-wrap gap-2 mb-8 min-h-[40px]">
        {skillList.length === 0 ? (
          <p className="text-gray-400 text-sm italic py-2">
            Start adding skills to see them in preview
          </p>
        ) : (
          skillList.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-50 text-gray-700 px-4 py-1.5 rounded-full flex items-center gap-2 text-sm border border-gray-200 animate-in fade-in zoom-in duration-300"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="p-0.5 hover:bg-red-100 rounded-full text-red-500 transition-colors"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-5 border-t border-gray-100 gap-4">
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

export default Step7Skill;
