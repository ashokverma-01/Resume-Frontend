import React, { useState } from "react";
import axios from "axios";
import { useResume } from "../../../context/Resume/ResumeContext";

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const { getUserResumes } = useResume();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Resume uploaded successfully!");
      getUserResumes(); // Refresh dashboard
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
};

export default ResumeUploader;
