import React from "react";
import ClassicTemplate from "./template/ClassicTemplate";
import ModernTemplate from "./template/ModernTemplate";
import MinimalTemplate from "./template/MinimalTemplate";
import SimpleTemplate from "./template/SimpleTemplate";
import Loader from "../../utils/Loader";
import { useResume } from "../../context/Resume/ResumeContext";
import { useAccentColor } from "../../context/Color/ColorContext";

const ResumePreview = ({ userData, selectedTemplate, loading }) => {
  const { resumeData } = useResume();
  const { accentColor } = useAccentColor();
  if (loading || !userData) {
    return (
      <Loader
        size={60}
        color={userData?.accentColor || "#6366f1"}
        text="Loading Resume..."
      />
    );
  }

  // Determine template
  const template = selectedTemplate?.toLowerCase() || "classic";

  const commonProps = {
    userData: resumeData,
    accentColor: accentColor,
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
