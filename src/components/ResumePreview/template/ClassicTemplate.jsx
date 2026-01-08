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

  return (
    <div className="min-h-screen bg-gray-100 md:py-10 flex justify-center items-start overflow-x-hidden">
      <div
        className="w-full max-w-[850px] bg-white shadow-none md:shadow-2xl p-6 sm:p-10 md:p-14 min-h-screen md:min-h-[1100px] flex flex-col border-t-[8px]"
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          wordBreak: "break-word",
          borderColor: accentColor, // Top bar color
        }}
      >
        {/* Header Section */}
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

        {/* Contact Info: Colors Fixed for All Icons & Links */}
        <div
          className="border-y py-4 mb-8"
          style={{ borderColor: `${accentColor}40` }}
        >
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-gray-700">
            {email && (
              <Info icon={<FiMail />} text={email} accentColor={accentColor} />
            )}
            {phone && (
              <Info icon={<FiPhone />} text={phone} accentColor={accentColor} />
            )}
            {address && (
              <Info
                icon={<FiMapPin />}
                text={address}
                accentColor={accentColor}
              />
            )}
            {linkedin && (
              <Info
                icon={<FiLinkedin />}
                text="LinkedIn"
                link={linkedin}
                accentColor={accentColor}
              />
            )}
            {website && (
              <Info
                icon={<FiGlobe />}
                text="Portfolio"
                link={website}
                accentColor={accentColor}
              />
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {summary && (
          <section className="mb-8">
            <h2
              className="text-lg font-bold uppercase mb-1 tracking-wider"
              style={{ color: accentColor }}
            >
              Professional Summary
            </h2>
            <div
              className="h-[2px] w-full mb-3"
              style={{ backgroundColor: accentColor }}
            ></div>
            <p className="text-gray-700 leading-relaxed text-[15px] text-justify whitespace-pre-line">
              {summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-lg font-bold uppercase mb-1 tracking-wider"
              style={{ color: accentColor }}
            >
              Work Experience
            </h2>
            <div
              className="h-[2px] w-full mb-4"
              style={{ backgroundColor: accentColor }}
            ></div>
            {experience.map((exp, i) => (
              <div
                key={i}
                className="mb-6 last:mb-0 border-l-[3px] pl-4"
                style={{ borderColor: accentColor }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 text-[16px] uppercase tracking-tight">
                    {exp.position}
                  </h3>
                  <span className="text-xs font-bold text-gray-500 italic bg-gray-50 px-2 py-1 rounded">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </span>
                </div>
                <div
                  className="text-sm font-bold italic mb-2"
                  style={{ color: accentColor }}
                >
                  {exp.company}
                </div>
                <p className="text-[14px] text-gray-700 leading-snug text-justify whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Projects & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
          <section>
            <h2
              className="text-lg font-bold uppercase mb-1 tracking-wider"
              style={{ color: accentColor }}
            >
              Projects
            </h2>
            <div
              className="h-[2px] w-full mb-3"
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

          <section>
            <h2
              className="text-lg font-bold uppercase mb-1 tracking-wider"
              style={{ color: accentColor }}
            >
              Education
            </h2>
            <div
              className="h-[2px] w-full mb-3"
              style={{ backgroundColor: accentColor }}
            ></div>
            {education.map((edu, i) => (
              <div key={i} className="mb-4 text-left">
                <h3 className="font-bold text-gray-900 text-[15px] leading-tight">
                  {edu.institute}
                </h3>
                <p className="text-sm italic text-gray-600">{edu.degree}</p>
                <p className="text-[11px] font-bold text-gray-400 mt-1">
                  {edu.startDate} — {edu.endDate}
                </p>
              </div>
            ))}
          </section>
        </div>

        {/* Skills & Languages: Bottom Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-auto">
          <section>
            <h2
              className="text-lg font-bold uppercase mb-1 tracking-wider"
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
                  className="px-2 py-1 border text-[11px] font-bold uppercase rounded shadow-sm"
                  style={{
                    borderColor: accentColor,
                    color: accentColor,
                    backgroundColor: `${accentColor}05`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2
              className="text-lg font-bold uppercase mb-1 tracking-wider"
              style={{ color: accentColor }}
            >
              Languages
            </h2>
            <div
              className="h-[2px] w-full mb-3"
              style={{ backgroundColor: accentColor }}
            ></div>
            <div className="grid grid-cols-2 gap-y-2">
              {languages.map((lang, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-800 font-semibold"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  ></span>
                  {lang}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// Info Component: FIXED Color and Link Support
const Info = ({ icon, text, link, accentColor }) => (
  <div className="flex items-center gap-1.5 whitespace-nowrap group">
    <span
      style={{ color: accentColor }}
      className="text-base transition-transform group-hover:scale-110"
    >
      {icon}
    </span>
    {link ? (
      <a
        href={link.startsWith("http") ? link : `https://${link}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[13px] sm:text-sm font-bold hover:underline decoration-gray-400 transition-colors"
        style={{ color: accentColor }} // Yahan link ka color wahi hoga jo aap select karenge
      >
        {text}
      </a>
    ) : (
      <span className="text-[13px] sm:text-sm font-medium text-gray-700">
        {text}
      </span>
    )}
  </div>
);

export default ClassicTemplate;
