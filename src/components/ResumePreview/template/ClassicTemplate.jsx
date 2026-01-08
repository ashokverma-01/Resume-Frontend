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
    languages = [], // Languages data
  } = userData || {};

  const formatURL = (url) => {
    if (!url) return "#";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 md:py-10 flex justify-center items-start">
      <div
        className="w-full max-w-[850px] bg-white shadow-none md:shadow-2xl p-6 sm:p-10 md:p-14 min-h-screen md:min-h-[1100px] flex flex-col"
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          wordBreak: "break-word",
        }}
      >
        {/* Header */}
        <header className="text-center mb-6">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 uppercase tracking-tight"
            style={{ color: accentColor }}
          >
            {fullName}
          </h1>
          <p className="text-sm sm:text-base font-bold text-gray-600 uppercase tracking-[3px]">
            {title}
          </p>
        </header>

        {/* Contact Info */}
        <div className="border-y py-4 mb-8">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-[13px] sm:text-[14px] text-gray-700 font-medium">
            {email && (
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <FiMail
                  style={{ color: accentColor }}
                  className="flex-shrink-0"
                />
                <span>{email}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <FiPhone
                  style={{ color: accentColor }}
                  className="flex-shrink-0"
                />
                <span>{phone}</span>
              </div>
            )}
            {address && (
              <div className="flex items-center gap-1.5">
                <FiMapPin
                  style={{ color: accentColor }}
                  className="flex-shrink-0"
                />
                <span>{address}</span>
              </div>
            )}
            {linkedin && (
              <a
                href={formatURL(linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 whitespace-nowrap font-bold"
                style={{ color: accentColor }}
              >
                <FiLinkedin className="flex-shrink-0" />
                <span className="underline decoration-gray-300">LinkedIn</span>
              </a>
            )}
            {website && (
              <a
                href={formatURL(website)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 whitespace-nowrap font-bold"
                style={{ color: accentColor }}
              >
                <FiGlobe className="flex-shrink-0" />
                <span className="underline decoration-gray-300">Portfolio</span>
              </a>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <section className="mb-8">
            <h2
              className="text-lg font-bold uppercase mb-1 tracking-wider"
              style={{ color: accentColor }}
            >
              Professional Summary
            </h2>
            <div
              className="h-[1.5px] w-full mb-3"
              style={{ backgroundColor: accentColor }}
            ></div>
            <p className="text-gray-700 leading-relaxed text-[15px] text-justify whitespace-pre-line">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-lg font-bold uppercase mb-1 tracking-wider"
              style={{ color: accentColor }}
            >
              Experience
            </h2>
            <div
              className="h-[1.5px] w-full mb-4"
              style={{ backgroundColor: accentColor }}
            ></div>
            {experience.map((exp, i) => (
              <div
                key={i}
                className="mb-6 last:mb-0 border-l-[3px] pl-4"
                style={{ borderColor: accentColor }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 uppercase">
                    {exp.position}
                  </h3>
                  <span className="text-xs font-bold text-gray-500 italic">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </span>
                </div>
                <div
                  className="text-sm font-bold italic mb-2"
                  style={{ color: accentColor }}
                >
                  {exp.company}
                </div>
                <p className="text-[14px] text-gray-700 leading-snug whitespace-pre-line text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Two Column for Projects & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
          {projects.length > 0 && (
            <section>
              <h2
                className="text-lg font-bold uppercase mb-1 tracking-wider"
                style={{ color: accentColor }}
              >
                Projects
              </h2>
              <div
                className="h-[1.5px] w-full mb-3"
                style={{ backgroundColor: accentColor }}
              ></div>
              {projects.map((proj, i) => (
                <div key={i} className="mb-4">
                  <h3 className="font-bold text-gray-800 text-[15px]">
                    {proj.title}
                  </h3>
                  <p className="text-[13px] text-gray-600 mt-1 leading-snug">
                    {proj.description}
                  </p>
                </div>
              ))}
            </section>
          )}
          {education.length > 0 && (
            <section>
              <h2
                className="text-lg font-bold uppercase mb-1 tracking-wider"
                style={{ color: accentColor }}
              >
                Education
              </h2>
              <div
                className="h-[1.5px] w-full mb-3"
                style={{ backgroundColor: accentColor }}
              ></div>
              {education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <h3 className="font-bold text-gray-900 text-[15px]">
                    {edu.institute}
                  </h3>
                  <p className="text-sm italic text-gray-600">{edu.degree}</p>
                  <p className="text-[11px] font-bold text-gray-400 mt-1">
                    {edu.startDate} — {edu.endDate}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Two Column for Skills & Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-auto">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2
                className="text-lg font-bold uppercase mb-1 tracking-wider"
                style={{ color: accentColor }}
              >
                Skills
              </h2>
              <div
                className="h-[1.5px] w-full mb-3"
                style={{ backgroundColor: accentColor }}
              ></div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-50 border border-gray-200 text-gray-700 text-[11px] font-bold uppercase rounded shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h2
                className="text-lg font-bold uppercase mb-1 tracking-wider"
                style={{ color: accentColor }}
              >
                Languages
              </h2>
              <div
                className="h-[1.5px] w-full mb-3"
                style={{ backgroundColor: accentColor }}
              ></div>
              <div className="grid grid-cols-2 gap-y-2">
                {languages.map((lang, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-700 font-semibold"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: accentColor }}
                    ></span>
                    {lang}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassicTemplate;
