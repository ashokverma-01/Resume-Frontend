import React from "react";
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Minimal.css";

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
      className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row print:shadow-none print:p-2"
      style={{ fontFamily: "Helvetica, sans-serif" }}
    >
      {/* LEFT / TOP SIDEBAR */}
      <div className="bg-gray-100 w-full lg:w-1/3 p-4 sm:p-6 flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mb-4 rounded-2xl overflow-hidden border-4 border-gray-200 flex items-center justify-center bg-gray-100 text-xl font-bold text-gray-600">
          {profileImage &&
          typeof profileImage === "object" &&
          profileImage.url ? (
            <img
              src={profileImage.url}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          ) : typeof profileImage === "string" && profileImage ? (
            <img
              src={profileImage}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          ) : profileImage instanceof File ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>
              {fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </span>
          )}
        </div>

        {/* Name */}
        <h2
          className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight"
          style={{ color: accentColor }}
        >
          {fullName}
        </h2>

        {title && (
          <p className="text-gray-600 text-sm sm:text-base mt-1 mb-4">
            {title}
          </p>
        )}

        {/* Contact */}
        <div className="w-full text-left text-xs sm:text-sm space-y-2 mb-6 break-all ">
          {phone && <Info icon={<FiPhone />} text={phone} />}
          {email && <Info icon={<FiMail />} text={email} />}
          {address && <Info icon={<FiMapPin />} text={address} />}
          {linkedin && <Info icon={<FiLinkedin />} link={linkedin} />}
          {website && <Info icon={<FiGlobe />} link={website} />}
        </div>

        {/* Skills */}

        {skills.length > 0 && (
          <SidebarSection title="Skills" accentColor={accentColor}>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium border"
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
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium border"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </SidebarSection>
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full lg:w-2/3 p-4 sm:p-6 space-y-6 print:p-2">
        {summary && (
          <MainSection title="Professional Summary" accentColor={accentColor}>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed break-words">
              {summary}
            </p>
          </MainSection>
        )}

        {experience.length > 0 && (
          <MainSection title="Work Experience" accentColor={accentColor}>
            {experience.map((exp, i) => (
              <Block key={i} accentColor={accentColor}>
                <div className="flex flex-col sm:flex-row sm:justify-between font-semibold break-words">
                  <span>{exp.position}</span>
                  <span className="text-xs bg-gray-100 px-3 py-1 rounded-full w-fit">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="font-medium">{exp.company}</p>
                {exp.description && (
                  <p className="text-sm text-gray-700">{exp.description}</p>
                )}
              </Block>
            ))}
          </MainSection>
        )}

        {projects.length > 0 && (
          <MainSection title="Projects" accentColor={accentColor}>
            {projects.map((p, i) => (
              <Block key={i} accentColor={accentColor}>
                <p className="font-semibold break-words">{p.title}</p>
                <p className="text-sm text-gray-700">{p.description}</p>
              </Block>
            ))}
          </MainSection>
        )}

        {education.length > 0 && (
          <MainSection title="Education" accentColor={accentColor}>
            {education.map((edu, i) => (
              <Block key={i} accentColor={accentColor}>
                <div className="flex flex-col sm:flex-row sm:justify-between font-semibold break-words">
                  <span>{edu.degree}</span>
                  <span className="text-xs bg-gray-100 px-3 py-1 rounded-full w-fit">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <p className="text-sm">{edu.institute}</p>
              </Block>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  );
};

/* REUSABLE COMPONENTS */
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

const SidebarSection = ({ title, children, accentColor }) => (
  <div className="w-full mb-6">
    <h3
      className="font-semibold mb-3 border-b-2 break-words"
      style={{ color: accentColor, borderColor: accentColor }}
    >
      {title}
    </h3>
    <div className="space-y-2 text-sm">{children}</div>
  </div>
);

const Bullet = ({ text, accentColor }) => (
  <div className="flex gap-2 break-words">
    <span
      className="w-2 h-2 mt-2 rounded-full flex-shrink-0"
      style={{ backgroundColor: accentColor }}
    />
    <span>{text}</span>
  </div>
);

const MainSection = ({ title, children, accentColor }) => (
  <section>
    <h3
      className="font-semibold mb-2 border-b-2 break-words"
      style={{ color: accentColor, borderColor: accentColor }}
    >
      {title}
    </h3>
    <div className="space-y-3">{children}</div>
  </section>
);

const Block = ({ children, accentColor }) => (
  <div
    className="border-l-4 pl-4 break-words"
    style={{ borderColor: accentColor }}
  >
    {children}
  </div>
);

export default MinimalTemplate;
