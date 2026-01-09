import React, { useState, useEffect } from "react";
import ProfileImage from "../Profile/profile";
import { useResume } from "../../context/Resume/ResumeContext";
import { FiUser } from "react-icons/fi";

const Step1Personal = ({ onNext }) => {
  const { resumeData, updateResumeData } = useResume();
  const [localData, setLocalData] = useState(resumeData || {});
  const [preview, setPreview] = useState("");

  // Sync localData with resumeData if it changes
  useEffect(() => {
    setLocalData(resumeData || {});
  }, [resumeData]);

  // Sync profile image preview
  useEffect(() => {
    let objectUrl;
    const img = localData.profileImage;

    if (!img) {
      setPreview("");
      return;
    }

    if (typeof img === "object" && img.url) {
      setPreview(img.url);
    } else if (typeof img === "string") {
      setPreview(img);
    } else if (img instanceof File) {
      objectUrl = URL.createObjectURL(img);
      setPreview(objectUrl);
    } else {
      setPreview("");
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [localData.profileImage]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile image upload
  const handleImageUpload = (file) => {
    if (!(file instanceof File)) return;
    setLocalData((prev) => ({ ...prev, profileImage: file }));
  };

  // Save local data to context and move to next step
  const handleNext = () => {
    updateResumeData(localData); // update context
    onNext(); // move to next step
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <FiUser size={20} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Personal
        </h2>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <ProfileImage image={preview} setImage={handleImageUpload} />
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <Input
          label="Full Name"
          name="fullName"
          value={localData.fullName || ""}
          onChange={handleChange}
        />
        <Input
          label="Title"
          name="title"
          value={localData.title || ""}
          onChange={handleChange}
        />
        <Input
          label="Email"
          name="email"
          value={localData.email || ""}
          onChange={handleChange}
        />
        <Input
          label="Phone"
          name="phone"
          value={localData.phone || ""}
          onChange={handleChange}
        />
        <Input
          label="Address"
          name="address"
          value={localData.address || ""}
          onChange={handleChange}
        />
      </div>

      {/* Save & Next button */}
      <div className="flex justify-center mt-6">
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
const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all shadow-sm"
    />
  </div>
);

export default Step1Personal;
