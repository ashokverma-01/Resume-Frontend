import React, { useState, useEffect } from "react";
import ResumeBuilder from "../components/ResumeBuilder/ResumeBuilder";
import ResumePreview from "../components/ResumePreview/ResumePreview";
import TopBar from "../utils/TopBar";
import { useParams } from "react-router-dom";
import { useResume } from "../context/Resume/ResumeContext";

const ResumeDashboard = () => {
  const { id } = useParams();
  const { getResumeById, resetResume } = useResume();
  const [userData, setUserData] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      setLoading(true);
      if (id) {
        // ✏️ EDIT MODE
        try {
          const data = await getResumeById(id);
          if (data?.success) {
            setUserData(data.resume);
          }
        } catch (err) {
          console.error("Error fetching resume:", err);
        }
      } else {
        // NEW RESUME
        resetResume();
        setUserData({});
      }
      setLoading(false);
    };

    fetchResume();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 app-root">
      {/* TOPBAR */}
      <div className="sticky top-0 z-50 no-print">
        <TopBar />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Loading resume...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6">
            {/* LEFT – STEPS */}
            <div className="bg-white rounded-xl shadow p-4 overflow-y-auto max-h-[70vh] lg:max-h-full no-print">
              <ResumeBuilder
                userData={userData}
                setUserData={setUserData}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
              />
            </div>

            {/* RIGHT – LIVE PREVIEW */}
            <div className="resume-print bg-gray-50 rounded-xl shadow p-4 overflow-y-auto max-h-[70vh] lg:max-h-full">
              <ResumePreview
                userData={userData}
                selectedTemplate={selectedTemplate}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeDashboard;
