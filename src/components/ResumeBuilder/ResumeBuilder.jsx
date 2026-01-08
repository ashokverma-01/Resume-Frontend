import React, { useEffect, useState } from "react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

import Step1Personal from "./Step1Personal";
import Step2Links from "./Step2Links";
import Step3Summary from "./Step3Summary";
import Step4Education from "./Step4Education";
import Step5Experience from "./Step5Experience";
import Step6Project from "./Step6Project";
import Step7Skill from "./Step7Skill";
import Step8Language from "./Step8Language";
import { useAccentColor } from "../../context/Color/ColorContext";
import { accentColors } from "../../components/color/AcentColors";

import ResumePreview from "../ResumePreview/ResumePreview";
import TemplatePopover from "../Template/TemplatePopover";
import AccentColorPopover from "../color/AccentColorPopover";
import Loader from "../../utils/Loader";

import { useResume } from "../../context/Resume/ResumeContext";

const ResumeBuilder = ({
  userData,
  setUserData,
  selectedTemplate,
  setSelectedTemplate,
}) => {
  const [step, setStep] = useState(1);
  const { addResume, updateResume, resumeId, updateResumeData, loading } =
    useResume();
  const { accentColor, setAccentColor } = useAccentColor();

  // Step Next handler
  const handleNext = async (data = {}) => {
    if (loading) return;
    updateResumeData(data);
    setUserData((prev) => ({ ...prev, ...data }));

    if (step === 8) {
      let res;

      if (resumeId) {
        res = await updateResume();
      } else {
        res = await addResume();
      }

      if (res?.success) {
        alert(resumeId ? "Resume updated ✅" : "Resume added ✅");
        setStep(9); // preview page
      } else {
        alert(res?.message || "Something went wrong");
      }
      return;
    }

    setStep((prev) => prev + 1);
  };

  // Step navigation
  const goNextStep = () => {
    if (step < 8) setStep((prev) => prev + 1);
  };
  const goPrevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  // Set default accent color if not present
  useEffect(() => {
    if (!userData.accentColor) {
      setUserData((prev) => ({ ...prev, accentColor: "#6366f1" }));
    }
  }, []);

  return (
    <>
      {/* Top controls */}
      <div className="flex items-center justify-between gap-2 px-2 py-3 sm:px-3 mb-4 bg-white rounded-xl shadow-sm">
        <div className="flex items-center gap-2">
          <TemplatePopover
            selectedTemplate={selectedTemplate}
            onSelect={setSelectedTemplate}
          />
          <AccentColorPopover
            options={accentColors}
            selectedColor={accentColor}
            onSelect={(color) => {
              setAccentColor(color); // context me save
              setUserData({ ...userData, accentColor: color }); // preview ke liye
            }}
          />
        </div>

        <button
          onClick={goPrevStep}
          disabled={step === 1}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed border border-transparent hover:border-gray-400"
        >
          <FiArrowLeft className="text-sm" />
          Back
        </button>

        <button
          onClick={goNextStep}
          disabled={step === 8}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition border border-transparent hover:border-green-400"
        >
          Next
          <FiArrowRight className="text-sm" />
        </button>
      </div>

      {/* Main content */}
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Show loader if saving/updating */}
        {loading && step <= 8 && (
          <Loader
            size={60}
            color={userData.accentColor || "#6366f1"}
            text="Saving..."
          />
        )}

        {!loading && (
          <>
            {step === 1 && (
              <Step1Personal
                userData={userData}
                onNext={handleNext}
                setUserData={setUserData}
                updateResumeData={updateResumeData}
              />
            )}
            {step === 2 && (
              <Step2Links
                userData={userData}
                onNext={handleNext}
                onBack={goPrevStep}
                updateResumeData={updateResumeData}
              />
            )}
            {step === 3 && (
              <Step3Summary
                userData={userData}
                onNext={handleNext}
                onBack={goPrevStep}
                updateResumeData={updateResumeData}
              />
            )}
            {step === 4 && (
              <Step4Education
                userData={userData}
                onNext={handleNext}
                onBack={goPrevStep}
                updateResumeData={updateResumeData}
              />
            )}
            {step === 5 && (
              <Step5Experience
                userData={userData}
                onNext={handleNext}
                onBack={goPrevStep}
                updateResumeData={updateResumeData}
              />
            )}
            {step === 6 && (
              <Step6Project
                userData={userData}
                onNext={handleNext}
                onBack={goPrevStep}
                updateResumeData={updateResumeData}
              />
            )}
            {step === 7 && (
              <Step7Skill
                userData={userData}
                onNext={handleNext}
                onBack={goPrevStep}
                updateResumeData={updateResumeData}
              />
            )}
            {step === 8 && (
              <Step8Language
                userData={userData}
                onNext={handleNext}
                onBack={goPrevStep}
                updateResumeData={updateResumeData}
              />
            )}
            {step === 9 && (
              <div className="max-w-3xl mx-auto">
                <ResumePreview
                  userData={userData}
                  selectedTemplate={selectedTemplate}
                  accentColor={userData.accentColor || "#6366f1"}
                  loading={loading}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ResumeBuilder;
