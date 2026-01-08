import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";

const DUMMY_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvdBkWggAMOSjxEw3H6hdGaINJe5duWkNdl_i-za1i_A&s"; // 🔹 your dummy image URL

const ProfileImage = ({ image, setImage }) => {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (image) {
      // if it's an object with URL (from DB)
      if (typeof image === "object" && image.url) {
        setPreview(image.url);
      }
      // if it's a string (direct URL)
      else if (typeof image === "string") {
        setPreview(image);
      }
      // if it's a File (uploaded)
      else {
        const objectUrl = URL.createObjectURL(image);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }
    } else {
      // 🔹 No image? show dummy
      setPreview(DUMMY_IMAGE);
    }
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // update parent state
      // preview will update via useEffect
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        <img
          src={preview || DUMMY_IMAGE}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <label className="mt-2 px-4 py-2 bg-blue-400 text-white rounded-lg cursor-pointer flex items-center gap-1">
        <FiUpload /> Upload
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ProfileImage;
