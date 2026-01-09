import React from "react";
import { FiFolder, FiTrash2, FiPlus } from "react-icons/fi";

const DEFAULT_PROJECT = {
  title: "",
  description: "",
};

const Step6Project = ({
  onNext,
  onBack,
  userData,
  setUserData,
  updateResumeData,
}) => {
  // Directly use userData projects or fallback to default
  const projectsList = userData.projects?.length
    ? userData.projects
    : [DEFAULT_PROJECT];

  // LIVE CHANGE: Parent state (userData) ko update karne ka logic
  const handleProjChange = (index, e) => {
    const { name, value } = e.target;
    const newProjects = [...projectsList];
    newProjects[index] = { ...newProjects[index], [name]: value };

    setUserData((prev) => ({
      ...prev,
      projects: newProjects,
    }));
  };

  const handleAddProj = () => {
    const newProjects = [...projectsList, DEFAULT_PROJECT];
    setUserData((prev) => ({ ...prev, projects: newProjects }));
  };

  const handleRemoveProj = (index) => {
    const newProjects = projectsList.filter((_, i) => i !== index);
    setUserData((prev) => ({ ...prev, projects: newProjects }));
  };

  const handleNextAction = () => {
    // Save to context for persistence
    updateResumeData({ projects: projectsList });
    onNext();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <FiFolder size={20} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Projects
        </h2>
      </div>

      {projectsList.map((proj, idx) => (
        <div
          key={idx}
          className="mb-4 p-4 border rounded-lg relative bg-gray-50/50 hover:bg-white transition-all"
        >
          {projectsList.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveProj(idx)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <FiTrash2 size={18} />
            </button>
          )}

          <InputField
            label="Title"
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
        className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-semibold flex items-center justify-center gap-2 border border-blue-100"
      >
        <FiPlus size={18} /> Add Project
      </button>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
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

// Reusable InputField component
const InputField = ({ label, name, value, onChange, textarea }) => (
  <div className="mb-2">
    <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase ml-1">
      {label}
    </label>
    {textarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all resize-none shadow-sm"
      />
    ) : (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all shadow-sm"
      />
    )}
  </div>
);

export default Step6Project;
