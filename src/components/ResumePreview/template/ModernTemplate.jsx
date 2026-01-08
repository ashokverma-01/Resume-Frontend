import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom";

const ModernTemplate = ({ userData = {}, accentColor = "#10b981" }) => {
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
    projects = [],
    education = [],
    skills = [],
    languages = [],
    profileImage,
  } = userData;

  return (
    <div
      className="w-full max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg text-sm sm:text-base"
      style={{ fontFamily: "Helvetica, sans-serif" }}
    >
      {/* Header */}

      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center md:items-start mb-6">
        {/* Profile Image */}
        <div
          className="order-1 md:order-none
               w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32
               rounded-full p-1 bg-white shadow-lg
               mx-auto md:mx-0"
        >
          <div
            className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200
                    flex items-center justify-center bg-gray-100
                    text-xl sm:text-2xl font-bold text-gray-600"
          >
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
        </div>

        {/* Name + Contact */}
        <div className="order-2 md:order-none flex-1 w-full">
          {/* Name */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold
                 text-center md:text-left"
            style={{ color: accentColor }}
          >
            {fullName}
          </h1>

          {/* Title */}
          <p
            className="text-sm sm:text-base font-semibold tracking-wide uppercase mb-2
                 text-gray-500 text-center md:text-left"
          >
            {title}
          </p>

          {/* Contact Info */}
          <div
            className="flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-4
                 text-gray-600 mt-2
                 items-start justify-start"
          >
            {email && (
              <span className="flex items-center gap-1 text-left">
                <FiMail className="shrink-0" /> {email}
              </span>
            )}

            {phone && (
              <span className="flex items-center gap-1 text-left">
                <FiPhone className="shrink-0" /> {phone}
              </span>
            )}

            {address && (
              <span className="flex items-center gap-1 text-left">
                <FiMapPin className="shrink-0" /> {address}
              </span>
            )}
          </div>

          {/* Social Links */}
          <div
            className="flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-6 mt-2
                 items-start justify-start"
          >
            {linkedin && (
              <Info
                icon={<FiLinkedin className="shrink-0" />}
                link={linkedin}
                className="text-left"
              />
            )}

            {website && (
              <Info
                icon={<FiGlobe className="shrink-0" />}
                link={website}
                className="text-left"
              />
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-4 border-t-2" style={{ borderColor: accentColor }} />

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2
            className="uppercase font-semibold text-base sm:text-lg mb-2"
            style={{ color: accentColor }}
          >
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2
            className="uppercase font-semibold text-base sm:text-lg mb-3"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          {experience.map((exp, i) => (
            <div
              key={i}
              className="mb-4 p-3 sm:p-4 rounded-lg border-l-4 bg-gray-50"
              style={{ borderColor: accentColor }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 font-semibold">
                <span>{exp.position}</span>
                <span className="bg-gray-100 text-xs sm:text-sm text-gray-500 py-1 px-3 rounded-full w-fit">
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>

              <div className="text-gray-700 font-medium mt-1">
                {exp.company}
              </div>

              {exp.description && (
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2
            className="uppercase font-semibold text-base sm:text-lg mb-3"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          {projects.map((project, i) => (
            <div
              key={i}
              className="mb-4 p-3 sm:p-4 rounded-lg border-l-4 bg-gray-50"
              style={{ borderColor: accentColor }}
            >
              <div className="font-semibold">{project.title}</div>
              <p className="text-sm text-gray-700 mt-1">
                {project.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2
            className="uppercase font-semibold text-base sm:text-lg mb-3"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          {education.map((edu, i) => (
            <div
              key={i}
              className="mb-3 p-3 sm:p-4 rounded-lg border-l-4 bg-gray-50"
              style={{ borderColor: accentColor }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between font-semibold gap-1">
                <span>{edu.degree}</span>
                <span className="bg-gray-100 text-xs sm:text-sm text-gray-500 py-1 px-3 rounded-md w-fit">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <div className="text-gray-700">{edu.institute}</div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2
            className="uppercase font-semibold text-base sm:text-lg mb-3"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

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
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-2">
          <h2
            className="uppercase font-semibold text-base sm:text-lg mb-3"
            style={{ color: accentColor }}
          >
            Languages
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
            {languages.map((language, i) => (
              <li key={i} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <span className="text-gray-800">{language}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
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
        style={{ color: accentColor }}
      >
        {link}
      </Link>
    ) : (
      <span>{text}</span>
    )}
  </div>
);

export default ModernTemplate;
