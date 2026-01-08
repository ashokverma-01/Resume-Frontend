import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiLinkedin,
  FiUser,
  FiBriefcase,
  FiBook,
} from "react-icons/fi";
import "./Simple.css";

const SidebarProfileTemplate = ({ userData = {}, accentColor = "#2563eb" }) => {
  const {
    fullName,
    title,
    profileImage,
    email,
    phone,
    address,
    website,
    linkedin,
    summary,
    experience = [],
    education = [],
    projects = [],
    skills = [],
    languages = [],
  } = userData;

  return (
    <div
      className="
        w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden
        text-sm relative print:shadow-none print:rounded-none
      "
      style={{
        fontFamily: "'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        className="h-24 sm:h-28 flex items-center justify-center text-center px-4"
        style={{ backgroundColor: accentColor }}
      >
        <div className="mb-2">
          <h1 className="text-xl sm:text-2xl font-bold text-white uppercase">
            {fullName}
          </h1>
          <p className="text-xs text-gray-200 tracking-widest uppercase mb-3">
            {title}
          </p>
        </div>
      </div>

      {/* PROFILE IMAGE */}

      <div
        className="
    absolute top-16 sm:top-14 left-1/2 sm:left-8
    -translate-x-1/2 sm:translate-x-0
    w-24 h-24
    rounded-full border-2 border-white
    overflow-hidden
    bg-gray-200
    flex items-center justify-center
    text-2xl font-bold text-gray-600
  "
      >
        {profileImage &&
        typeof profileImage === "object" &&
        profileImage.url ? (
          <img
            src={profileImage.url}
            alt={fullName}
            className="w-full h-full object-cover rounded-full"
          />
        ) : typeof profileImage === "string" && profileImage ? (
          <img
            src={profileImage}
            alt={fullName}
            className="w-full h-full object-cover rounded-full"
          />
        ) : profileImage instanceof File ? (
          <img
            src={URL.createObjectURL(profileImage)}
            alt={fullName}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span>
            {fullName
              ?.trim()
              .split(/\s+/)
              .slice(0, 2)
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </span>
        )}
      </div>

      {/* BODY */}
      <div className="grid grid-cols-1 md:grid-cols-3 pt-20 sm:pt-16">
        {/* LEFT SIDEBAR */}
        <aside className="md:col-span-1 bg-gray-100 px-5 pb-6 space-y-5 print:text-[11px]">
          {/* CONTACT */}
          <section>
            <h3
              className="font-bold uppercase mb-3"
              style={{ color: accentColor }}
            >
              Contact
            </h3>
            <div className="space-y-2 text-xs text-gray-700 break-all">
              {phone && (
                <p className="flex items-center gap-2">
                  <FiPhone /> {phone}
                </p>
              )}
              {email && (
                <p className="flex items-center gap-2">
                  <FiMail /> {email}
                </p>
              )}
              {address && (
                <p className="flex items-center gap-2">
                  <FiMapPin /> {address}
                </p>
              )}
              {website && (
                <p className="flex items-center gap-2">
                  <FiGlobe /> {website}
                </p>
              )}
              {linkedin && (
                <p className="flex items-center gap-2">
                  <FiLinkedin /> {linkedin}
                </p>
              )}
            </div>
          </section>

          {/* SKILLS */}
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
        </aside>

        {/* RIGHT CONTENT */}
        <main className="md:col-span-2 px-6 pb-6 space-y-6">
          {/* PROFILE */}
          {summary && (
            <section>
              <h2
                className="flex items-center gap-2 font-bold uppercase mb-2"
                style={{ color: accentColor }}
              >
                <FiUser /> Profile
              </h2>
              <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
            </section>
          )}

          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <section>
              <h2
                className="flex items-center gap-2 font-bold uppercase mb-4"
                style={{ color: accentColor }}
              >
                <FiBriefcase /> Work Experience
              </h2>

              <div className="border-l-2 border-gray-300 pl-6 space-y-6">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <p className="font-semibold text-gray-800">
                        {exp.company}
                      </p>
                      <p className="text-xs text-gray-500">
                        {exp.startDate} – {exp.endDate}
                      </p>
                    </div>

                    <p className="text-xs text-gray-600">{exp.position}</p>

                    {exp.description && (
                      <ul className="list-disc ml-4 mt-1 text-xs text-gray-700">
                        {exp.description.split("\n").map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* EDUCATION */}
          {education.length > 0 && (
            <section>
              <h2
                className="flex items-center gap-2 font-bold uppercase mb-4"
                style={{ color: accentColor }}
              >
                <FiBook /> Education
              </h2>

              <div className="border-l-2 border-gray-300 pl-6 space-y-6">
                {education.map((edu, i) => (
                  <div key={i}>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <p className="font-semibold text-gray-800">
                        {edu.institute}
                      </p>
                      <p className="text-xs text-gray-500">
                        {edu.startDate} – {edu.endDate || "Present"}
                      </p>
                    </div>

                    {edu.degree && (
                      <ul className="list-disc ml-4 mt-1 text-xs text-gray-700">
                        {edu.degree.split("\n").map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PROJECTS */}
          {projects.length > 0 && (
            <section>
              <h2
                className="flex items-center gap-2 font-bold uppercase mb-4"
                style={{ color: accentColor }}
              >
                <FiBriefcase /> Projects
              </h2>

              <div className="border-l-2 border-gray-300 pl-6 space-y-6">
                {projects.map((p, i) => (
                  <div key={i}>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <p className="font-semibold text-gray-800">{p.title}</p>
                      {p.duration && (
                        <p className="text-xs text-gray-500">{p.duration}</p>
                      )}
                    </div>

                    {p.tech && (
                      <p className="text-xs text-gray-600">{p.tech}</p>
                    )}

                    {p.description && (
                      <ul className="list-disc ml-4 mt-1 text-xs text-gray-700">
                        {p.description.split("\n").map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

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

export default SidebarProfileTemplate;
