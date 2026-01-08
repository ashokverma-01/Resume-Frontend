// PublicResume.jsx
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ResumePreview from "../components/ResumePreview/ResumePreview";

const PublicResume = () => {
  const { resumeId } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://resume-backend-s69p.onrender.com/api/resume/public/${resumeId}`
      )
      .then((res) => setResume(res.data.resume))
      .catch(() => console.log("Resume not public"));
  }, [id]);

  return <ResumePreview data={resume} />;
};

export default PublicResume;
