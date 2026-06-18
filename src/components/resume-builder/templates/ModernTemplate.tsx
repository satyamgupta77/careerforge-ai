import { ResumeData } from "@/store/useResumeStore";

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, experience, skills, projects, certifications, languages, layout } = data;

  const renderSection = (section: string) => {
    switch (section) {
      case "experience":
        if (experience.length === 0) return null;
        return (
          <section key="experience" className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3" style={{ color: "var(--theme-color, #4f46e5)" }}>Professional Experience</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-lg">{exp.role}</h3>
                    <span className="text-sm font-medium text-gray-500 whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-md font-medium text-gray-700 mb-2">{exp.company}</div>
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
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3" style={{ color: "var(--theme-color, #4f46e5)" }}>Education</h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-lg">{edu.degree}</h3>
                    <span className="text-sm font-medium text-gray-500 whitespace-nowrap ml-4">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div className="text-md font-medium text-gray-700 mb-1">{edu.school}</div>
                  {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );
      case "projects":
        if (projects.length === 0) return null;
        return (
          <section key="projects" className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3" style={{ color: "var(--theme-color, #4f46e5)" }}>Projects</h2>
            <div className="space-y-4">
              {projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {proj.name}
                    </h3>
                    {proj.url && <a href={proj.url} className="text-sm text-gray-500 underline ml-4">{proj.url}</a>}
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
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3" style={{ color: "var(--theme-color, #4f46e5)" }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s.id} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm font-medium border border-gray-200">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        );
      case "certifications":
        if (certifications.length === 0) return null;
        return (
          <section key="certifications" className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3" style={{ color: "var(--theme-color, #4f46e5)" }}>Certifications</h2>
            <div className="space-y-4">
              {certifications.map(cert => (
                <div key={cert.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-lg">{cert.name}</h3>
                    <span className="text-sm font-medium text-gray-500 whitespace-nowrap ml-4">{cert.date}</span>
                  </div>
                  <div className="text-md font-medium text-gray-700">{cert.issuer} {cert.url && <a href={cert.url} className="text-sm text-indigo-600 underline ml-2">Verify Credential</a>}</div>
                </div>
              ))}
            </div>
          </section>
        );
      case "languages":
        if (languages.length === 0) return null;
        return (
          <section key="languages" className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3" style={{ color: "var(--theme-color, #4f46e5)" }}>Languages</h2>
            <div className="flex flex-wrap gap-6">
              {languages.map(l => (
                <div key={l.id} className="flex flex-col">
                  <span className="font-bold text-gray-900 text-md">{l.name}</span>
                  <span className="text-sm text-gray-600">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-10 font-sans text-gray-900 leading-relaxed bg-white min-h-[297mm]" style={{ fontFamily: "var(--font-family, 'Inter', sans-serif)" }}>
      {/* Header */}
      <header className="border-b-2 pb-6 mb-6" style={{ borderColor: "var(--theme-color, #4f46e5)" }}>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight uppercase mb-2">
          {personalInfo.name || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.address && <span>• {personalInfo.address}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: "var(--theme-color, #4f46e5)" }}>Professional Summary</h2>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{personalInfo.summary}</p>
        </section>
      )}

      {/* Dynamic Sections */}
      {layout.map(renderSection)}
    </div>
  );
}
