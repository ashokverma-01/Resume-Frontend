import React, { useState, useEffect } from "react";
import { useResume } from "../../context/Resume/ResumeContext";

const DEFAULT_PROJECT = {
  title: "",
  description: "",
};

const Step6Project = ({ onNext, onBack }) => {
  const { resumeData, updateResumeData } = useResume();

  const [projectsList, setProjectsList] = useState(
    resumeData.projects?.length ? resumeData.projects : [DEFAULT_PROJECT]
  );

  // 🔄 Sync with context when user navigates back
  useEffect(() => {
    setProjectsList(
      resumeData.projects?.length ? resumeData.projects : [DEFAULT_PROJECT]
    );
  }, [resumeData.projects]);

  const handleProjChange = (index, e) => {
    const { name, value } = e.target;
    setProjectsList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  const handleAddProj = () =>
    setProjectsList((prev) => [...prev, DEFAULT_PROJECT]);

  const handleRemoveProj = (index) =>
    setProjectsList((prev) => prev.filter((_, i) => i !== index));

  const handleNext = () => {
    updateResumeData({ projects: projectsList }); // 🔹 update context
    onNext();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Projects</h2>

      {projectsList.map((proj, idx) => (
        <div
          key={idx}
          className="mb-4 p-4 border rounded-lg relative bg-gray-50"
        >
          {projectsList.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveProj(idx)}
              className="absolute top-2 right-2 text-red-500 font-bold"
            >
              ×
            </button>
          )}

          <InputField
            label="Project Title"
            name="title"
            value={proj.title || ""}
            onChange={(e) => handleProjChange(idx, e)}
          />

          <InputField
            label="Description"
            name="description"
            value={proj.description || ""}
            onChange={(e) => handleProjChange(idx, e)}
            textarea
          />
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddProj}
        className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
      >
        + Add Project
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

// Reusable InputField component
const InputField = ({ label, name, value, onChange, textarea }) => (
  <div className="mb-2">
    <label className="block text-gray-700 mb-1">{label}</label>
    {textarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
      />
    ) : (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all shadow-sm"
      />
    )}
  </div>
);

export default Step6Project;
