import React, { useState, useEffect } from "react";
import { useResume } from "../../context/Resume/ResumeContext";
import DateInput from "../../utils/DateInput";
import { FiPlus, FiTrash2, FiBookOpen } from "react-icons/fi";

const Step4Education = ({ onNext, onBack }) => {
  const { resumeData, updateResumeData } = useResume();

  const [educationList, setEducationList] = useState(
    resumeData.education?.length
      ? resumeData.education
      : [{ institute: "", degree: "", startDate: "", endDate: "" }]
  );

  useEffect(() => {
    setEducationList(
      resumeData.education?.length
        ? resumeData.education
        : [{ institute: "", degree: "", startDate: "", endDate: "" }]
    );
  }, [resumeData.education]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setEducationList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  const handleAdd = () => {
    setEducationList((prev) => [
      ...prev,
      { institute: "", degree: "", startDate: "", endDate: "" },
    ]);
  };

  const handleRemove = (index) => {
    setEducationList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    updateResumeData({ education: educationList });
    onNext();
  };

  return (
    <div className="bg-white p-4 sm:p-7 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <FiBookOpen size={20} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Education
        </h2>
      </div>

      <div className="space-y-6">
        {educationList.map((edu, index) => (
          <div
            key={index}
            className="p-4 sm:p-5 border border-gray-100 rounded-2xl relative bg-gray-50/50 hover:bg-white hover:border-purple-100 transition-all duration-300"
          >
            {/* Remove Button */}
            {educationList.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 text-red-500 font-bold"
              >
                <FiTrash2 size={18} />
              </button>
            )}

            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Institute / University"
                name="institute"
                placeholder="e.g. University of Delhi"
                value={edu.institute || ""}
                onChange={(e) => handleChange(index, e)}
              />

              <Input
                label="Degree / Course"
                name="degree"
                placeholder="e.g. Bachelor of Technology"
                value={edu.degree || ""}
                onChange={(e) => handleChange(index, e)}
              />

              {/* 🔹 Responsive Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase ml-1">
                    Start Date
                  </label>
                  <DateInput
                    value={edu.startDate ? edu.startDate.substring(0, 7) : ""}
                    onChange={(e) =>
                      handleChange(index, {
                        target: { name: "startDate", value: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase ml-1">
                    End Date
                  </label>
                  <DateInput
                    value={edu.endDate ? edu.endDate.substring(0, 7) : ""}
                    onChange={(e) =>
                      handleChange(index, {
                        target: { name: "endDate", value: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        type="button"
        onClick={handleAdd}
        className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-semibold flex items-center justify-center gap-2 border border-blue-100 active:scale-[0.98]"
      >
        <FiPlus /> Add Education
      </button>

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

// ---------- Optimized Input Component ----------
const Input = ({ label, name, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase ml-1">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-white border border-gray-200 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-purple-400 outline-none transition-all placeholder:text-gray-300 shadow-sm"
    />
  </div>
);

export default Step4Education;
