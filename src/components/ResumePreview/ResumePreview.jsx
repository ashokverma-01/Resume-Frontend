import React from "react";
import ClassicTemplate from "./template/ClassicTemplate";
import ModernTemplate from "./template/ModernTemplate";
import MinimalTemplate from "./template/MinimalTemplate";
import SimpleTemplate from "./template/SimpleTemplate";
import Loader from "../../utils/Loader";
import { useResume } from "../../context/Resume/ResumeContext";
import { useAccentColor } from "../../context/Color/ColorContext";

const ResumePreview = ({ userData, selectedTemplate, loading }) => {
  const { resumeData: contextData } = useResume();
  const { accentColor: contextColor } = useAccentColor();

  // Logic: Agar props se userData mil raha hai (Public link) toh wo use karo,
  // warna Context wala data use karo (Editor/Dashboard).
  const finalData = userData || contextData;
  const finalColor = userData?.accentColor || contextColor || "#6366f1";

  // Loading handle karein
  if (loading || !finalData || Object.keys(finalData).length === 0) {
    return <Loader size={60} color={finalColor} text="Loading Resume..." />;
  }

  // Template determine karein: priority (props > DB saved template > default)
  const template =
    selectedTemplate?.toLowerCase() ||
    finalData?.template?.toLowerCase() ||
    "classic";

  const commonProps = {
    userData: finalData, // Pehle yahan 'resumeData' hardcoded tha, ab 'finalData' hai
    accentColor: finalColor,
  };

  switch (template) {
    case "modern":
      return <ModernTemplate {...commonProps} />;
    case "minimal":
      return <MinimalTemplate {...commonProps} />;
    case "simple":
      return <SimpleTemplate {...commonProps} />;
    case "classic":
    default:
      return <ClassicTemplate {...commonProps} />;
  }
};

export default ResumePreview;
