import React, { useState, useEffect } from "react";
import { useResume } from "../../context/Resume/ResumeContext";
import { FiPlus, FiX, FiZap } from "react-icons/fi";

const Step7Skill = ({ onNext, onBack }) => {
  const { resumeData, updateResumeData } = useResume();
  const [skillList, setSkillList] = useState(resumeData.skills || []);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    setSkillList(resumeData.skills || []);
  }, [resumeData.skills]);

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;

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
        <div className="w-full">
          <input
            type="text"
            value={skillInput || ""}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="e.g. Graphic Design"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all shadow-sm"
            onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
          />
        </div>

        <button
          onClick={handleAddSkill}
          className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-semibold flex items-center justify-center gap-2 border border-blue-100 active:scale-[0.98]"
        >
          <FiPlus size={18} />
          Add Skills
        </button>
      </div>

      {/* Skills Showcase */}
      <div className="flex flex-wrap gap-2 mb-8">
        {skillList.length === 0 ? (
          <p className="text-gray-400 text-sm italic py-2">
            Start typing to showcase your expertise
          </p>
        ) : (
          skillList.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-50 text-gray-700 px-4 py-1.5 rounded-full flex items-center gap-2 text-sm border border-gray-200"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="p-0.5 hover:bg-red-100 rounded-full text-red-500 transition-colors"
              >
                <FiX size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-5 border-t border-gray-100 gap-4">
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
