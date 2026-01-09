import React, { useState, useEffect } from "react";
import { useResume } from "../../context/Resume/ResumeContext";
import DateInput from "../../utils/DateInput"; // your custom month picker

const Step4Education = ({ onNext, onBack }) => {
  const { resumeData, updateResumeData } = useResume();

  const [educationList, setEducationList] = useState(
    resumeData.education?.length
      ? resumeData.education
      : [{ institute: "", degree: "", startDate: "", endDate: "" }]
  );

  // Sync local state with context
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
    updateResumeData({ education: educationList }); // update context
    onNext();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Education</h2>

      {educationList.map((edu, index) => (
        <div
          key={index}
          className="mb-4 p-4 border rounded-lg relative bg-gray-50"
        >
          {educationList.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 text-red-500 font-bold text-lg"
            >
              ×
            </button>
          )}

          <Input
            label="Institute"
            name="institute"
            value={edu.institute || ""}
            onChange={(e) => handleChange(index, e)}
          />

          <Input
            label="Degree"
            name="degree"
            value={edu.degree || ""}
            onChange={(e) => handleChange(index, e)}
          />

          <div className="mt-3">
            <label className="block text-gray-700 mb-1">Start Date</label>
            <DateInput
              value={edu.startDate ? edu.startDate.substring(0, 7) : ""}
              onChange={(e) =>
                handleChange(index, {
                  target: { name: "startDate", value: e.target.value },
                })
              }
            />
          </div>

          <div className="mt-3">
            <label className="block text-gray-700 mb-1">End Date</label>
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
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
      >
        + Add Education
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

// ---------- Reusable Input Component ----------
const Input = ({ label, name, value, onChange }) => (
  <div className="mb-2">
    <label className="block text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all shadow-sm"
    />
  </div>
);

export default Step4Education;
