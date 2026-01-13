import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({});
  const [resumeId, setResumeId] = useState(null);
  const [userResumes, setUserResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateResumeData = (data) => {
    setResumeData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const buildFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (
        ["education", "experience", "projects", "skills", "languages"].includes(
          key
        )
      ) {
        formData.append(key, JSON.stringify(value || []));
      } else if (key === "profileImageFile" && value instanceof File) {
        formData.append("profileImage", value);
      } else {
        formData.append(key, value);
      }
    });
    return formData;
  };

  // Add new resume
  const addResume = async (overrideData = {}) => {
    try {
      setLoading(true);
      const finalData = { ...resumeData, ...overrideData };
      const formData = buildFormData(finalData);

      const res = await axiosInstance.post("/resume/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.resume?._id) setResumeId(res.data.resume._id);
      setResumeData(res.data.resume || {});

      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Resume creation failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Update  resume
  const updateResume = async (overrideData = {}) => {
    if (!resumeId) return { success: false, message: "Resume ID not found" };

    try {
      setLoading(true);
      const finalData = { ...resumeData, ...overrideData };
      const formData = buildFormData(finalData);

      const res = await axiosInstance.put(
        `/resume/update/${resumeId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResumeData(res.data.resume || {});

      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Resume update failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Fetch resume by ID
  const getResumeById = async (id) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/resume/get/${id}`);
      if (data.success) {
        setResumeData(data.resume);
        setResumeId(data.resume._id);
      }
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Public resume (NO TOKEN)
  const getPublicResumeById = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://resume-backend-s69p.onrender.com/api/resume/public/${id}`
      );

      if (data.success) {
        setResumeData(data.resume);
        setResumeId(data.resume._id);
      }

      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all resumes of the user
  const getUserResumes = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/resume/get");
      if (data.success) setUserResumes(data.resumes || []);
      return data.success
        ? { success: true, resumes: data.resumes }
        : { success: false, resumes: [] };
    } catch (error) {
      console.log(error);
      return { success: false, resumes: [] };
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResume = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    try {
      setLoading(true);
      await axiosInstance.delete(`/resume/delete/${id}`);

      setUserResumes((prevResumes) => {
        if (!Array.isArray(prevResumes)) return [];
        return prevResumes.filter((resume) => resume._id !== id);
      });
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset resume state
  const resetResume = () => {
    setResumeData({});
    setResumeId(null);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updateResumeData,
        addResume,
        updateResume,
        getUserResumes,
        getResumeById,
        getPublicResumeById,
        userResumes,
        resetResume,
        handleDeleteResume,
        resumeId,
        loading,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
