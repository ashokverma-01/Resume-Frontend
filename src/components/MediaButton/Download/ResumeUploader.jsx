import React, { useState } from "react";
import axios from "axios";
import { FiUploadCloud, FiFile, FiX } from "react-icons/fi";
import { useResume } from "../../../context/Resume/ResumeContext";

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { getUserResumes } = useResume();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    setUploading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Resume uploaded successfully! ✅");
      setFile(null); // Reset file after upload
      getUserResumes(); // Refresh dashboard
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-6 transition-all ${
          file
            ? "border-purple-400 bg-purple-50"
            : "border-gray-300 bg-gray-50 hover:border-purple-300"
        }`}
      >
        {/* Hidden Input */}
        <input
          type="file"
          id="resume-upload"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
        />

        {!file ? (
          /* Initial State: Dropzone */
          <label
            htmlFor="resume-upload"
            className="flex flex-col items-center justify-center cursor-pointer gap-3"
          >
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
              <FiUploadCloud size={28} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700">
                Click to upload resume
              </p>
              <p className="text-xs text-gray-500 mt-1">PDF, DOC (Max 5MB)</p>
            </div>
          </label>
        ) : (
          /* Selected File State */
          <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-purple-100">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 bg-purple-600 text-white rounded-lg flex-shrink-0">
                <FiFile size={20} />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {file.name}
                </p>
                <p className="text-[10px] text-gray-400">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              onClick={() => setFile(null)}
              className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            >
              <FiX size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full mt-4 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
          !file || uploading
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-200 active:scale-[0.98]"
        }`}
      >
        {uploading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Uploading...
          </>
        ) : (
          "Upload Now"
        )}
      </button>
    </div>
  );
};

export default ResumeUploader;
