import React, { useState, useEffect } from "react";
import { useResume } from "../../context/Resume/ResumeContext";
import DateInput from "../../utils/DateInput";
import {
  FiPlus,
  FiTrash2,
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
} from "react-icons/fi";

const DEFAULT_EXPERIENCE = {
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
};

const Step5Experience = ({ onNext, onBack }) => {
  const { resumeData, updateResumeData } = useResume();
  const [experienceList, setExperienceList] = useState(
    resumeData.experience?.length ? resumeData.experience : [DEFAULT_EXPERIENCE]
  );

  useEffect(() => {
    setExperienceList(
      resumeData.experience?.length
        ? resumeData.experience
        : [DEFAULT_EXPERIENCE]
    );
  }, [resumeData.experience]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setExperienceList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  const handleAdd = () =>
    setExperienceList((prev) => [...prev, DEFAULT_EXPERIENCE]);

  const handleRemove = (index) =>
    setExperienceList((prev) => prev.filter((_, i) => i !== index));

  const handleNext = () => {
    updateResumeData({ experience: experienceList });
    onNext();
  };

  return (
    <div className="bg-white p-4 sm:p-7 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <FiBriefcase size={20} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Experience
        </h2>
      </div>

      <div className="space-y-6">
        {experienceList.map((exp, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 border border-gray-100 rounded-2xl relative bg-gray-50/50 hover:bg-white hover:border-blue-100 transition-all duration-300"
          >
            {experienceList.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
              >
                <FiTrash2 size={18} />
              </button>
            )}

            <div className="grid grid-cols-1 gap-4">
              <InputField
                label="Company Name"
                name="company"
                placeholder="e.g. Google"
                value={exp.company}
                onChange={(e) => handleChange(idx, e)}
              />

              <InputField
                label="Job Position"
                name="position"
                placeholder="e.g. Senior Developer"
                value={exp.position}
                onChange={(e) => handleChange(idx, e)}
              />

              {/* 🔹 Date Grid: Mobile par 1 column, Tablet/Laptop par 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                    Start Date
                  </label>
                  <DateInput
                    value={exp.startDate ? exp.startDate.substring(0, 7) : ""}
                    onChange={(e) =>
                      handleChange(idx, {
                        target: { name: "startDate", value: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                    End Date
                  </label>
                  <DateInput
                    value={exp.endDate ? exp.endDate.substring(0, 7) : ""}
                    onChange={(e) =>
                      handleChange(idx, {
                        target: { name: "endDate", value: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <InputField
                label="Description"
                name="description"
                placeholder="Describe your key achievements..."
                value={exp.description}
                onChange={(e) => handleChange(idx, e)}
                textarea
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-semibold flex items-center justify-center gap-2 border border-blue-100 active:scale-[0.98]"
      >
        <FiPlus /> Add Experience
      </button>

      {/* Navigation */}
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

const InputField = ({
  label,
  name,
  value,
  onChange,
  textarea,
  placeholder,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-bold text-gray-500 uppercase ml-1">
      {label}
    </label>
    {textarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all resize-none"
      />
    ) : (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all"
      />
    )}
  </div>
);

export default Step5Experience;
