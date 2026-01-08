import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ResumePreview from "../components/ResumePreview/ResumePreview";

const PublicResume = () => {
  const { resumeId } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (resumeId) {
      setLoading(true);
      axios
        .get(
          `https://resume-backend-s69p.onrender.com/api/resume/public/${resumeId}`
        )
        .then((res) => {
          if (res.data.success) {
            setResume(res.data.resume);
          } else {
            setError("Resume data not found");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("API Error:", err);
          setError(err.response?.data?.message || "Failed to load resume");
          setLoading(false);
        });
    } else {
      setError("No Resume ID provided in URL");
      setLoading(false);
    }
  }, [resumeId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 font-medium text-gray-600">Loading Resume...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500 p-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Error!</h2>
        <p className="bg-red-50 px-4 py-2 rounded-lg border border-red-200">
          {error}
        </p>
      </div>
    );
  }

  // Yahan sabse bada change hai: Prop ka naam "userData" hona chahiye
  return <ResumePreview userData={resume} loading={loading} />;
};

export default PublicResume;
