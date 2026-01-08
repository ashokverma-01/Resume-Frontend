import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Zaroori: URL se ID lene ke liye
import axios from "axios";
import ResumePreview from "../components/ResumePreview/ResumePreview";

const PublicResume = () => {
  // useParams ka use karein kyunki URL /public/:resumeId hai
  const { resumeId: urlId } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (urlId) {
      axios
        .get(
          `https://resume-backend-s69p.onrender.com/api/resume/public/${urlId}`
        )
        .then((res) => {
          setResume(res.data.resume);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Resume not found or not public", err);
          setLoading(false);
        });
    }
  }, [urlId]);

  if (loading)
    return <div className="text-center mt-10">Loading Resume...</div>;
  if (!resume)
    return (
      <div className="text-center mt-10">Resume not found or Private.</div>
    );

  return <ResumePreview data={resume} />;
};

export default PublicResume;
