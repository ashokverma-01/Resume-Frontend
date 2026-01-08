import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom";

const ClassicTemplate = ({ userData, accentColor }) => {
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
  } = userData;

  return (
    <div
      className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg text-sm sm:text-[15px]"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      {/* Name */}
      <h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-1 sm:mb-3 md:mb-5"
        style={{ color: accentColor }}
      >
        {fullName}
      </h1>
      <p className="text-xs sm:text-sm md:text-base font-semibold tracking-wide uppercase text-gray-700 text-center mb-4">
        {title}
      </p>

      {/* Contact */}
      <div className="flex flex-col gap-3 mb-6 text-gray-700 w-full">
        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-start sm:justify-center gap-2 sm:gap-6 w-full">
          {email && (
            <span className="flex items-center gap-2 justify-start w-full sm:w-auto">
              <FiMail className="text-gray-600" /> {email}
            </span>
          )}
          {phone && (
            <span className="flex items-center gap-2 justify-start w-full sm:w-auto">
              <FiPhone className="text-gray-600" /> {phone}
            </span>
          )}
          {address && (
            <span className="flex items-center gap-2 justify-start w-full sm:w-auto text-left sm:text-center">
              <FiMapPin className="text-gray-600" /> {address}
            </span>
          )}
        </div>

        {/* Social / Links */}
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-start sm:justify-center gap-2 sm:gap-6 w-full">
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

      <hr className="my-4 border-t-2" style={{ borderColor: accentColor }} />

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2
            className="font-semibold text-lg sm:text-xl mb-2"
            style={{ color: accentColor }}
          >
            Professional Summary
          </h2>
          <p className="leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2
            className="font-semibold text-lg sm:text-xl mb-3"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          {experience.map((exp, i) => (
            <div
              key={i}
              className="mb-4 border-l-4 pl-3 sm:pl-4"
              style={{ borderColor: accentColor }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 font-semibold">
                <span>{exp.position || "Position"}</span>
                <span className="bg-gray-100 text-xs sm:text-sm text-gray-500 py-1 px-3 rounded-md w-fit">
                  {exp.startDate || "Start"} – {exp.endDate || "End"}
                </span>
              </div>

              <div className="font-medium">{exp.company || "Company Name"}</div>

              {exp.description && (
                <p className="text-gray-700 mt-1 leading-relaxed">
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
            className="font-semibold text-lg sm:text-xl mb-3"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          {projects.map((project, index) => (
            <div
              key={index}
              className="mb-4 pl-3 sm:pl-4 border-l-4"
              style={{ borderColor: accentColor }}
            >
              <div className="font-semibold">
                {project.title || "Project Title"}
              </div>

              <p className="mt-1 text-gray-700 leading-relaxed">
                {project.description || "Project description"}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2
            className="font-semibold text-lg sm:text-xl mb-3"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          {education.map((edu, index) => (
            <div
              key={index}
              className="mb-3 border-l-4 pl-3 sm:pl-4"
              style={{ borderColor: accentColor }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between font-semibold gap-1">
                <span>{edu.degree || "Degree"}</span>
                <span className="bg-gray-100 text-xs sm:text-sm text-gray-500 py-1 px-3 rounded-md w-fit">
                  {edu.startDate || "Start"} – {edu.endDate || "End"}
                </span>
              </div>

              <div className="text-gray-700">
                {edu.institute || "Institute Name"}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2
            className="font-semibold text-lg sm:text-xl mb-3"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 sm:px-4 py-1 text-sm sm:text-base rounded-full border font-medium"
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                }}
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
            className="font-semibold text-lg sm:text-xl mb-3"
            style={{ color: accentColor }}
          >
            Languages
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
            {languages.map((language, index) => (
              <li key={index} className="flex items-center gap-2">
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
      >
        {link}
      </Link>
    ) : (
      <span>{text}</span>
    )}
  </div>
);

export default ClassicTemplate;
