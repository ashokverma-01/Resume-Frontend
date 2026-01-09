import React, { useState, useEffect } from "react";
import ProfileImage from "../Profile/profile";
import { FiUser } from "react-icons/fi";

// 1. Destructure userData and setUserData from props
const Step1Personal = ({ onNext, userData, setUserData, updateResumeData }) => {
  const [preview, setPreview] = useState("");

  // Sync profile image preview (using userData directly)
  useEffect(() => {
    let objectUrl;
    const img = userData?.profileImage;

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
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [userData?.profileImage]);

  // 2. LIVE CHANGE: Direct parent state update
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile image upload
  const handleImageUpload = (file) => {
    if (!(file instanceof File)) return;
    setUserData((prev) => ({ ...prev, profileImage: file }));
  };

  const handleNextAction = () => {
    // Context update for DB/Persistence
    updateResumeData(userData);
    onNext();
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

      <div className="flex justify-center mb-6">
        <ProfileImage image={preview} setImage={handleImageUpload} />
      </div>

      <div className="space-y-4">
        {/* 3. Bind values directly to userData */}
        <Input
          label="Full Name"
          name="fullName"
          value={userData?.fullName || ""}
          onChange={handleChange}
        />
        <Input
          label="Title"
          name="title"
          value={userData?.title || ""}
          onChange={handleChange}
        />
        <Input
          label="Email"
          name="email"
          value={userData?.email || ""}
          onChange={handleChange}
        />
        <Input
          label="Phone"
          name="phone"
          value={userData?.phone || ""}
          onChange={handleChange}
        />
        <Input
          label="Address"
          name="address"
          value={userData?.address || ""}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-center mt-6">
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

const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase ml-1">
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
