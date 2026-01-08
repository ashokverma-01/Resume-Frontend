import React from "react";
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom";

const MinimalTemplate = ({ userData, accentColor = "#1f2937" }) => {
  const {
    fullName = "Your Name",
    title,
    email,
    phone,
    address,
    linkedin,
    website,
    summary,
    experience = [],
    education = [],
    skills = [],
    profileImage = "",
    languages = [],
    projects = [],
  } = userData;

  return (
    <div
      className="max-w-4xl mx-auto bg-white shadow-lg flex flex-col md:flex-row print:shadow-none min-h-screen md:min-h-0"
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
    >
      {/* LEFT SIDEBAR - Fixed Width and Colors */}
      <div className="bg-gray-50 w-full md:w-[35%] p-6 sm:p-8 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-gray-200">
        {/* Profile Image - Responsive Size */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-6 rounded-2xl overflow-hidden border-4 border-white shadow-md flex items-center justify-center bg-white flex-shrink-0">
          {profileImage ? (
            <img
              src={
                typeof profileImage === "string"
                  ? profileImage
                  : profileImage.url || URL.createObjectURL(profileImage)
              }
              alt={fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-gray-300">
              {fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </span>
          )}
        </div>

        {/* Name & Title */}
        <div className="mb-6">
          <h2
            className="text-2xl sm:text-3xl font-bold leading-tight break-words"
            style={{ color: accentColor }}
          >
            {fullName}
          </h2>
          {title && (
            <p className="text-gray-600 font-medium mt-1 uppercase tracking-wide text-xs sm:text-sm">
              {title}
            </p>
          )}
        </div>

        {/* Contact Info - FIXED Break-words & Links */}
        <div className="w-full space-y-3 mb-8">
          {phone && (
            <Info icon={<FiPhone />} text={phone} accentColor={accentColor} />
          )}
          {email && (
            <Info icon={<FiMail />} text={email} accentColor={accentColor} />
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
              link={linkedin}
              text="LinkedIn"
              accentColor={accentColor}
            />
          )}
          {website && (
            <Info
              icon={<FiGlobe />}
              link={website}
              text="Portfolio"
              accentColor={accentColor}
            />
          )}
        </div>

        {/* Skills - Tag Style */}
        {skills.length > 0 && (
          <SidebarSection title="Skills" accentColor={accentColor}>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-md text-[11px] font-bold uppercase border bg-white"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </SidebarSection>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <SidebarSection title="Languages" accentColor={accentColor}>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {languages.map((lang, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  {lang}
                </div>
              ))}
            </div>
          </SidebarSection>
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full md:w-[65%] p-6 sm:p-10 space-y-8 bg-white">
        {summary && (
          <MainSection title="Professional Summary" accentColor={accentColor}>
            <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed text-justify">
              {summary}
            </p>
          </MainSection>
        )}

        {experience.length > 0 && (
          <MainSection title="Experience" accentColor={accentColor}>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <Block key={i} accentColor={accentColor}>
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-1 mb-1">
                    <h4 className="font-bold text-gray-900 text-base">
                      {exp.position}
                    </h4>
                    <span className="text-[10px] font-bold uppercase bg-gray-100 px-2 py-1 rounded text-gray-500">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <p
                    className="font-bold text-sm mb-2"
                    style={{ color: accentColor }}
                  >
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-600 leading-snug whitespace-pre-line">
                    {exp.description}
                  </p>
                </Block>
              ))}
            </div>
          </MainSection>
        )}

        {projects.length > 0 && (
          <MainSection title="Projects" accentColor={accentColor}>
            <div className="grid grid-cols-1 gap-4">
              {projects.map((p, i) => (
                <Block key={i} accentColor={accentColor}>
                  <p className="font-bold text-gray-800">{p.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{p.description}</p>
                </Block>
              ))}
            </div>
          </MainSection>
        )}

        {education.length > 0 && (
          <MainSection title="Education" accentColor={accentColor}>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <Block key={i} accentColor={accentColor}>
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-800 text-sm">
                      {edu.degree}
                    </h4>
                    <span className="text-[10px] font-bold text-gray-400">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{edu.institute}</p>
                </Block>
              ))}
            </div>
          </MainSection>
        )}
      </div>
    </div>
  );
};

/* REUSABLE COMPONENTS - WITH CSS FIXES */
const Info = ({ icon, text, link, accentColor }) => (
  <div className="flex items-center gap-3 text-gray-700 w-full overflow-hidden">
    <span className="flex-shrink-0 text-base" style={{ color: accentColor }}>
      {icon}
    </span>
    {link ? (
      <a
        href={link.startsWith("http") ? link : `https://${link}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs sm:text-sm font-semibold truncate hover:underline"
        style={{ color: accentColor }}
      >
        {text || link.replace(/(^\w+:|^)\/\//, "")}
      </a>
    ) : (
      <span className="text-xs sm:text-sm font-medium truncate">{text}</span>
    )}
  </div>
);

const SidebarSection = ({ title, children, accentColor }) => (
  <div className="w-full mb-8">
    <h3
      className="text-xs font-bold uppercase tracking-[2px] mb-4 pb-1 border-b-2"
      style={{ color: accentColor, borderColor: accentColor }}
    >
      {title}
    </h3>
    {children}
  </div>
);

const MainSection = ({ title, children, accentColor }) => (
  <section className="w-full">
    <h3
      className="text-sm font-bold uppercase tracking-[3px] mb-4 flex items-center gap-2"
      style={{ color: accentColor }}
    >
      {title}
      <span className="flex-1 h-[1px] bg-gray-200"></span>
    </h3>
    {children}
  </section>
);

const Block = ({ children, accentColor }) => (
  <div className="border-l-2 pl-4 py-1" style={{ borderColor: accentColor }}>
    {children}
  </div>
);

export default MinimalTemplate;
