import React from "react";
import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGlobe } from "react-icons/fi";

// Aapka preferred Info component layout

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
        className="w-full max-w-[850px] bg-white shadow-none md:shadow-2xl p-6 sm:p-10 md:p-14 min-h-screen md:min-h-[1100px] flex flex-col"
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          wordBreak: "break-word",
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

        {/* Contact Info Section - Fixed with Info Component */}
        <div className="border-y py-4 mb-8">
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
                icon={
                  <FiLinkedin className="inline mr-1 sm:mr-2 text-gray-600" />
                }
                link={linkedin}
                className="w-full sm:w-auto text-left sm:text-center"
              />
            )}
            {website && (
              <Info
                icon={<FiGlobe className="inline mr-1 sm:mr-2 text-gray-600" />}
                link={website}
                className="w-full sm:w-auto text-left sm:text-center"
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
              Experience
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
                <p className="text-[14px] text-gray-700 leading-snug text-justify whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Two Column Grid: Projects & Education */}
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

        {/* Bottom Section: Skills & Languages FIXED */}
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
                  className="px-2 py-1 bg-gray-50 border border-gray-200 text-gray-700 text-[11px] font-bold uppercase rounded shadow-sm"
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
              {languages.length > 0 ? (
                languages.map((lang, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-800 font-semibold"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    ></span>
                    {lang}
                  </div>
                ))
              ) : (
                <p className="text-xs italic text-gray-400">
                  Add languages in form
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const Info = ({ icon, text, link, accentColor }) => (
  <div className="flex items-center gap-2 text-gray-700 break-all">
    {icon}
    {link ? (
      <Link
        to={link}
        target="_blank"
        className="flex items-center gap-1 text-sm text-gray-700 no-underline hover:underline"
      >
        {link}
      </Link>
    ) : (
      <span>{text}</span>
    )}
  </div>
);

export default ClassicTemplate;
