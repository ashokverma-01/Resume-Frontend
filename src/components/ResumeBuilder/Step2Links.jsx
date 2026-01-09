import React from "react";
import { FaLinkedin } from "react-icons/fa";

const Step2Links = ({
  onNext,
  onBack,
  userData,
  setUserData,
  updateResumeData,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Direct Parent state update for live preview
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextAction = () => {
    // Context update sirf API ya persistence ke liye
    if (updateResumeData) {
      updateResumeData(userData);
    }
    onNext();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <FaLinkedin size={20} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Personal Links
        </h2>
      </div>

      <div className="space-y-4">
        <Input
          label="LinkedIn"
          name="linkedin"
          value={userData?.linkedin || ""} // Safe access with fallback
          onChange={handleChange}
          placeholder="https://linkedin.com/in/username"
        />

        <Input
          label="Portfolio"
          name="website"
          value={userData?.website || ""} // Safe access with fallback
          onChange={handleChange}
          placeholder="https://yourwebsite.com"
        />
      </div>

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

const Input = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
      {label}
    </label>
    <input
      type="text" // 'url' ki jagah 'text' karke dekhein testing ke liye
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 px-4 py-3 rounded-xl text-sm outline-none"
    />
  </div>
);

export default Step2Links;
