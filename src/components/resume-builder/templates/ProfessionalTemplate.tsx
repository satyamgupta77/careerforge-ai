import { ResumeData } from "@/store/useResumeStore";

export default function ProfessionalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, experience, skills, projects, certifications, languages, layout } = data;

  const renderSection = (section: string) => {
    switch (section) {
      case "experience":
        if (experience.length === 0) return null;
        return (
          <section key="experience" className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase mb-3 flex items-center" style={{ color: "var(--theme-color, #111827)" }}>
              <span className="bg-gray-900 w-6 h-px mr-3" style={{ backgroundColor: "var(--theme-color, #111827)" }}></span>
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-end">
                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-700 mt-1 mb-2" style={{ color: "var(--theme-color, #374151)" }}>{exp.company}</div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "education":
        if (education.length === 0) return null;
        return (
          <section key="education" className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase mb-3 flex items-center" style={{ color: "var(--theme-color, #111827)" }}>
              <span className="bg-gray-900 w-6 h-px mr-3" style={{ backgroundColor: "var(--theme-color, #111827)" }}></span>
              Education
            </h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-end">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-700 mt-1" style={{ color: "var(--theme-color, #374151)" }}>{edu.school}</div>
                  {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );
      case "projects":
        if (projects.length === 0) return null;
        return (
          <section key="projects" className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase mb-3 flex items-center" style={{ color: "var(--theme-color, #111827)" }}>
              <span className="bg-gray-900 w-6 h-px mr-3" style={{ backgroundColor: "var(--theme-color, #111827)" }}></span>
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-end">
                    <h3 className="font-bold text-gray-900">{proj.name}</h3>
                    {proj.url && <span className="text-xs text-gray-500">{proj.url}</span>}
                  </div>
                  <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "skills":
        if (skills.length === 0) return null;
        return (
          <section key="skills" className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase mb-3 flex items-center" style={{ color: "var(--theme-color, #111827)" }}>
              <span className="bg-gray-900 w-6 h-px mr-3" style={{ backgroundColor: "var(--theme-color, #111827)" }}></span>
              Skills
            </h2>
            <div className="text-sm text-gray-800 leading-relaxed font-medium">
              {skills.map(s => s.name).join(" • ")}
            </div>
          </section>
        );
      case "certifications":
        if (certifications.length === 0) return null;
        return (
          <section key="certifications" className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase mb-3 flex items-center" style={{ color: "var(--theme-color, #111827)" }}>
              <span className="bg-gray-900 w-6 h-px mr-3" style={{ backgroundColor: "var(--theme-color, #111827)" }}></span>
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map(cert => (
                <div key={cert.id}>
                  <div className="flex justify-between items-end">
                    <h3 className="font-bold text-gray-900">{cert.name}</h3>
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{cert.date}</span>
                  </div>
                  <div className="text-sm text-gray-700 mt-1">{cert.issuer} {cert.url && <a href={cert.url} className="text-xs text-blue-500 underline ml-2">Verify</a>}</div>
                </div>
              ))}
            </div>
          </section>
        );
      case "languages":
        if (languages.length === 0) return null;
        return (
          <section key="languages" className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase mb-3 flex items-center" style={{ color: "var(--theme-color, #111827)" }}>
              <span className="bg-gray-900 w-6 h-px mr-3" style={{ backgroundColor: "var(--theme-color, #111827)" }}></span>
              Languages
            </h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-800">
              {languages.map(l => (
                <div key={l.id}><span className="font-semibold">{l.name}</span>: {l.proficiency}</div>
              ))}
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[297mm] bg-white text-gray-800 flex" style={{ fontFamily: "var(--font-family, 'Roboto', sans-serif)" }}>
      {/* Left Sidebar (Darker Shade based on theme is hard, we'll use a soft gray but accent it) */}
      <div className="w-1/3 bg-gray-50 p-8 border-r border-gray-200">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 uppercase leading-none mb-2" style={{ color: "var(--theme-color, #111827)" }}>
            {personalInfo.name ? personalInfo.name.split(' ').map((n, i) => <div key={i}>{n}</div>) : "Your Name"}
          </h1>
        </header>

        <section className="mb-8 space-y-4 text-sm text-gray-600">
          {personalInfo.email && <div><strong>Email:</strong><br/>{personalInfo.email}</div>}
          {personalInfo.phone && <div><strong>Phone:</strong><br/>{personalInfo.phone}</div>}
          {personalInfo.address && <div><strong>Address:</strong><br/>{personalInfo.address}</div>}
          {personalInfo.linkedin && <div className="break-words"><strong>LinkedIn:</strong><br/>{personalInfo.linkedin}</div>}
          {personalInfo.github && <div className="break-words"><strong>GitHub:</strong><br/>{personalInfo.github}</div>}
          {personalInfo.website && <div className="break-words"><strong>Website:</strong><br/>{personalInfo.website}</div>}
        </section>

        {skills.length > 0 && (
          <section>
            <h2 className="text-md font-bold text-gray-900 uppercase mb-3" style={{ color: "var(--theme-color, #111827)" }}>Core Skills</h2>
            <ul className="space-y-1 text-sm text-gray-700">
              {skills.map(s => (
                <li key={s.id} className="flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-gray-400 before:mr-2 before:rounded-full">
                  {s.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {languages.length > 0 && (
          <section className="mt-8">
            <h2 className="text-md font-bold text-gray-900 uppercase mb-3" style={{ color: "var(--theme-color, #111827)" }}>Languages</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              {languages.map(l => (
                <li key={l.id}>
                  <strong>{l.name}</strong><br/><span className="text-xs">{l.proficiency}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 uppercase mb-3 flex items-center" style={{ color: "var(--theme-color, #111827)" }}>
              <span className="bg-gray-900 w-6 h-px mr-3" style={{ backgroundColor: "var(--theme-color, #111827)" }}></span>
              Profile
            </h2>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{personalInfo.summary}</p>
          </section>
        )}

        {/* Dynamic Sections (skipping skills and languages since they are in sidebar) */}
        {layout.filter(s => s !== 'skills' && s !== 'languages').map(renderSection)}
      </div>
    </div>
  );
}
