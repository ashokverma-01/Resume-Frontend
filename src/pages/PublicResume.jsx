// PublicResume.jsx
import { useResume } from "../context/Resume/ResumeContext";
import axios from "axios";
import { useEffect, useState } from "react";
import ResumePreview from "../components/ResumePreview/ResumePreview";

const PublicResume = () => {
  const { resumeId } = useResume();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://resume-backend-s69p.onrender.com/api/resume/public/${resumeId}`
      )
      .then((res) => setResume(res.data.resume))
      .catch(() => console.log("Resume not public"));
  }, [resumeId]);

  return <ResumePreview data={resume} />;
};

export default PublicResume;
