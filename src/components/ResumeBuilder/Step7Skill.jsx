import React, { useState, useEffect } from "react";
import { useResume } from "../../context/Resume/ResumeContext";

const Step7Skill = ({ onNext, onBack }) => {
  const { resumeData, updateResumeData } = useResume();
  const [skillList, setSkillList] = useState(resumeData.skills || []);
  const [skillInput, setSkillInput] = useState("");

  // Sync skills when context changes (Back button or external update)
  useEffect(() => {
    setSkillList(resumeData.skills || []);
  }, [resumeData.skills]);

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;

    // Prevent duplicates (case-insensitive)
    if (skillList.some((s) => s.toLowerCase() === trimmed.toLowerCase()))
      return;

    const updatedSkills = [...skillList, trimmed];
    setSkillList(updatedSkills);
    setSkillInput("");
  };

  const handleRemoveSkill = (skill) => {
    const updatedSkills = skillList.filter((s) => s !== skill);
    setSkillList(updatedSkills);
  };

  const handleNext = () => {
    updateResumeData({ skills: skillList }); // 🔹 update context
    onNext();
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md max-w-full sm:max-w-md mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
        Skills
      </h2>

      {/* Skill Input */}
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <input
          type="text"
          value={skillInput || ""}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Add a skill (e.g. React, Node.js)"
          className="flex-1 border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
        />
        <button
          type="button"
          onClick={handleAddSkill}
          className="w-full sm:w-auto px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
        >
          Add
        </button>
      </div>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2 min-h-[40px]">
        {skillList.length === 0 && (
          <p className="text-sm text-gray-400">No skills added yet</p>
        )}

        {skillList.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-2 text-sm"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-red-500 font-bold"
            >
              ×
            </button>
          </span>
        ))}
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

export default Step7Skill;
