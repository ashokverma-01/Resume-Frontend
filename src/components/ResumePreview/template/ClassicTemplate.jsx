import React from "react";
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGlobe } from "react-icons/fi";

const ClassicTemplate = ({ userData, accentColor }) => {
  // Destructuring with fallbacks
  const {
    fullName = "Your Name",
    title = "",
    email = "",
    phone = "",
    address = "",
    linkedin = "", // LinkedIn variable
    website = "", // Website variable
    summary = "",
    experience = [],
    projects = [],
    education = [],
    skills = [],
    languages = [],
  } = userData || {};

  return (
    <div className="min-h-screen bg-gray-50 md:py-10 flex justify-center">
      <div
        className="w-full max-w-[850px] bg-white shadow-none md:shadow-2xl md:rounded-lg p-5 sm:p-8 md:p-12 min-h-screen md:min-h-[1100px]"
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          wordBreak: "break-word",
        }}
      >
        <header className="text-center mb-6 sm:mb-8">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 uppercase tracking-tight"
            style={{ color: accentColor }}
          >
            {fullName}
          </h1>
          <p className="text-sm sm:text-base font-semibold text-gray-600 tracking-[0.1em] uppercase">
            {title}
          </p>
        </header>

        {/* Updated Contact Info Section */}
        <div className="flex flex-wrap justify-center gap-y-2 gap-x-4 sm:gap-x-6 text-[13px] sm:text-sm text-gray-700 mb-6 border-y py-4">
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
            <div className="flex items-center gap-1.5">
              <FiMapPin style={{ color: accentColor }} /> <span>{address}</span>
            </div>
          )}

          {/* LinkedIn Fix */}
          {linkedin && (
            <a
              href={
                linkedin.startsWith("http") ? linkedin : `https://${linkedin}`
              }
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:underline decoration-blue-700"
            >
              <FiLinkedin style={{ color: accentColor }} />
              <span className="text-blue-700">LinkedIn</span>
            </a>
          )}

          {/* Website/Portfolio Fix */}
          {website && (
            <a
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:underline decoration-blue-700"
            >
              <FiGlobe style={{ color: accentColor }} />
              <span className="text-blue-700">Portfolio</span>
            </a>
          )}
        </div>

        {/* Summary */}
        {summary && (
          <section className="mb-8">
            <h2
              className="text-lg font-bold uppercase border-b-2 mb-2 pb-0.5"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-lg font-bold uppercase border-b-2 mb-4 pb-0.5"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Experience
            </h2>
            {experience.map((exp, i) => (
              <div
                key={i}
                className="mb-5 last:mb-0 border-l-2 pl-4"
                style={{ borderColor: accentColor }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                  <h3 className="font-bold text-gray-800 text-base">
                    {exp.position || exp.role}
                  </h3>
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </span>
                </div>
                <div
                  className="text-sm font-bold italic mb-2"
                  style={{ color: accentColor }}
                >
                  {exp.company}
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-line leading-snug">
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
              className="text-lg font-bold uppercase border-b-2 mb-4 pb-0.5"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Projects
            </h2>
            {projects.map((proj, i) => (
              <div
                key={i}
                className="mb-4 last:mb-0 border-l-2 pl-4"
                style={{ borderColor: accentColor }}
              >
                <h3 className="font-bold text-gray-800">{proj.title}</h3>
                <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-lg font-bold uppercase border-b-2 mb-3 pb-0.5"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-50 border text-gray-700 text-xs sm:text-sm font-medium rounded shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-lg font-bold uppercase border-b-2 mb-4 pb-0.5"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Education
            </h2>
            {education.map((edu, i) => (
              <div
                key={i}
                className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div>
                  <h3 className="font-bold text-gray-800">{edu.institute}</h3>
                  <p className="text-sm italic text-gray-600">{edu.degree}</p>
                </div>
                <span className="text-xs font-bold text-gray-500">
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
            ))}
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section className="mb-4">
            <h2
              className="text-lg font-bold uppercase border-b-2 mb-3 pb-0.5"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              Languages
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-800">
              {languages.map((lang, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  <span>{lang}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;
