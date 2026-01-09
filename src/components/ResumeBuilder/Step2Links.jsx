import React, { useState, useEffect } from "react";
import { useResume } from "../../context/Resume/ResumeContext";

const Step2Links = ({ onNext, onBack }) => {
  const { resumeData, updateResumeData } = useResume();

  const [formData, setFormData] = useState({
    linkedin: resumeData.linkedin || "",
    website: resumeData.website || "",
  });

  // Sync local state if context changes externally (Back button, API load etc.)
  useEffect(() => {
    setFormData({
      linkedin: resumeData.linkedin || "",
      website: resumeData.website || "",
    });
  }, [resumeData.linkedin, resumeData.website]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save data to context and go to next step
  const handleNext = () => {
    updateResumeData(formData); // update context
    onNext();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Professional & Links</h2>

      {/* Inputs */}
      <div className="space-y-4">
        <Input
          label="LinkedIn Profile"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/username"
        />

        <Input
          label="Personal Website / Portfolio"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://yourwebsite.com"
        />
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

// Reusable Input component
const Input = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="url"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all shadow-sm"
    />
  </div>
);

export default Step2Links;
