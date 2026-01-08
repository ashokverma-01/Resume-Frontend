import React from "react";
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGlobe } from "react-icons/fi";

const ClassicTemplate = ({ userData, accentColor }) => {
  const {
    fullName = "Your Name",
    title = "",
    email = "",
    phone = "",
    address = "",
    linkedin = "",
    website = "",
    summary = "",
    experience = [],
    projects = [],
    education = [],
    skills = [],
    languages = [],
  } = userData || {};

  // URL formatter function taaki link hamesha clickable rahe
  const formatURL = (url) => {
    if (!url) return "#";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 md:py-10 flex justify-center items-start overflow-x-hidden">
      <div
        className="w-full max-w-[850px] bg-white shadow-none md:shadow-2xl md:rounded-sm p-6 sm:p-10 md:p-14 min-h-screen md:min-h-[1100px] flex flex-col"
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          wordBreak: "break-word",
        }}
      >
        {/* Header */}
        <header className="text-center mb-6">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 uppercase tracking-tighter"
            style={{ color: accentColor }}
          >
            {fullName}
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg font-bold text-gray-600 tracking-[0.15em] uppercase border-b-2 inline-block pb-1"
            style={{ borderColor: accentColor }}
          >
            {title}
          </p>
        </header>

        {/* Contact & Social Info - Icons and Links Fixed */}
        <div className="flex flex-wrap justify-center items-center gap-y-3 gap-x-6 text-[13px] sm:text-sm text-gray-700 mb-8 border-y py-4">
          {email && (
            <div className="flex items-center gap-1.5">
              <FiMail style={{ color: accentColor }} /> <span>{email}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-1.5">
              <FiPhone style={{ color: accentColor }} /> <span>{phone}</span>
            </div>
          )}
          {address && (
            <div className="flex items-center gap-1.5 text-center">
              <FiMapPin style={{ color: accentColor }} /> <span>{address}</span>
            </div>
          )}

          {/* LinkedIn Link */}
          {linkedin && (
            <a
              href={formatURL(linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline decoration-gray-400"
              style={{ color: "inherit" }}
            >
              <FiLinkedin style={{ color: accentColor }} />
              <span className="font-semibold text-blue-700">LinkedIn</span>
            </a>
          )}

          {/* Website Link */}
          {website && (
            <a
              href={formatURL(website)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline decoration-gray-400"
              style={{ color: "inherit" }}
            >
              <FiGlobe style={{ color: accentColor }} />
              <span className="font-semibold text-blue-700">Portfolio</span>
            </a>
          )}
        </div>

        {/* Summary */}
        {summary && (
          <section className="mb-8">
            <h2
              className="text-lg font-bold uppercase mb-1 tracking-wide"
              style={{ color: accentColor }}
            >
              Professional Summary
            </h2>
            <div
              className="h-[2px] w-full mb-3"
              style={{ backgroundColor: accentColor }}
            ></div>
            <p className="text-gray-700 leading-relaxed text-[15px] text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-lg font-bold uppercase mb-1 tracking-wide"
              style={{ color: accentColor }}
            >
              Experience
            </h2>
            <div
              className="h-[2px] w-full mb-4"
              style={{ backgroundColor: accentColor }}
            ></div>
            {experience.map((exp, i) => (
              <div key={i} className="mb-6 last:mb-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-1">
                  <h3 className="font-bold text-gray-900 text-[16px] uppercase">
                    {exp.position}
                  </h3>
                  <span className="text-sm font-bold text-gray-500 italic">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </span>
                </div>
                <div
                  className="text-[15px] font-bold mb-2 italic"
                  style={{ color: accentColor }}
                >
                  {exp.company}
                </div>
                <p className="text-[14px] text-gray-700 whitespace-pre-line text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-lg font-bold uppercase mb-1 tracking-wide"
              style={{ color: accentColor }}
            >
              Projects
            </h2>
            <div
              className="h-[2px] w-full mb-4"
              style={{ backgroundColor: accentColor }}
            ></div>
            {projects.map((proj, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <h3 className="font-bold text-gray-800 text-[16px]">
                  {proj.title}
                </h3>
                <p className="text-[14px] text-gray-700 mt-1">
                  {proj.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Skills & Education side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2
              className="text-lg font-bold uppercase mb-1 tracking-wide"
              style={{ color: accentColor }}
            >
              Skills
            </h2>
            <div
              className="h-[2px] w-full mb-3"
              style={{ backgroundColor: accentColor }}
            ></div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-50 border text-gray-800 text-xs font-bold uppercase rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2
              className="text-lg font-bold uppercase mb-1 tracking-wide"
              style={{ color: accentColor }}
            >
              Education
            </h2>
            <div
              className="h-[2px] w-full mb-3"
              style={{ backgroundColor: accentColor }}
            ></div>
            {education.map((edu, i) => (
              <div key={i} className="mb-3">
                <h3 className="font-bold text-gray-900 text-[15px]">
                  {edu.institute}
                </h3>
                <p className="text-sm italic text-gray-600">{edu.degree}</p>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicTemplate;
