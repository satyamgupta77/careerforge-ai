import { ResumeData } from "@/store/useResumeStore";

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, experience, skills, projects, certifications, languages, layout } = data;

  const renderSection = (section: string) => {
    switch (section) {
      case "experience":
        if (experience.length === 0) return null;
        return (
          <section key="experience" className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4" style={{ color: "var(--theme-color, #9ca3af)" }}>Experience</h2>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id} className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 text-xs text-gray-500 pt-1">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </div>
                  <div className="col-span-3">
                    <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                    <div className="text-sm text-gray-600 mb-2">{exp.company}</div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case "education":
        if (education.length === 0) return null;
        return (
          <section key="education" className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4" style={{ color: "var(--theme-color, #9ca3af)" }}>Education</h2>
            <div className="space-y-6">
              {education.map(edu => (
                <div key={edu.id} className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 text-xs text-gray-500 pt-1">
                    {edu.startDate} — {edu.endDate}
                  </div>
                  <div className="col-span-3">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <div className="text-sm text-gray-600 mb-1">{edu.school}</div>
                    {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case "projects":
        if (projects.length === 0) return null;
        return (
          <section key="projects" className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4" style={{ color: "var(--theme-color, #9ca3af)" }}>Projects</h2>
            <div className="space-y-6">
              {projects.map(proj => (
                <div key={proj.id} className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 text-xs text-gray-500 pt-1">
                    Project
                  </div>
                  <div className="col-span-3">
                    <h3 className="font-semibold text-gray-900">
                      {proj.name} {proj.url && <a href={proj.url} className="font-normal text-gray-500 underline ml-2">Link</a>}
                    </h3>
                    <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{proj.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case "skills":
        if (skills.length === 0) return null;
        return (
          <section key="skills" className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4" style={{ color: "var(--theme-color, #9ca3af)" }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s.id} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        );
      case "certifications":
        if (certifications.length === 0) return null;
        return (
          <section key="certifications" className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4" style={{ color: "var(--theme-color, #9ca3af)" }}>Certifications</h2>
            <div className="space-y-4">
              {certifications.map(cert => (
                <div key={cert.id} className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 text-xs text-gray-500 pt-1">{cert.date}</div>
                  <div className="col-span-3">
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <div className="text-sm text-gray-600">{cert.issuer} {cert.url && <a href={cert.url} className="text-gray-400 underline ml-2">Link</a>}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case "languages":
        if (languages.length === 0) return null;
        return (
          <section key="languages" className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4" style={{ color: "var(--theme-color, #9ca3af)" }}>Languages</h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
              {languages.map(l => (
                <div key={l.id} className="flex flex-col">
                  <span className="font-semibold text-gray-900">{l.name}</span>
                  <span className="text-xs text-gray-500">{l.proficiency}</span>
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
    <div className="p-12 bg-white min-h-[297mm] text-gray-800 leading-relaxed" style={{ fontFamily: "var(--font-family, 'Inter', sans-serif)" }}>
      {/* Header */}
      <header className="mb-12 grid grid-cols-4 gap-4">
        <div className="col-span-1">
           {/* Space for layout consistency */}
        </div>
        <div className="col-span-3">
          <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-4" style={{ color: "var(--theme-color, #111827)" }}>
            {personalInfo.name || "Your Name"}
          </h1>
          <div className="flex flex-col gap-1 text-sm text-gray-500">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
            <div className="flex gap-3 mt-1">
              {personalInfo.linkedin && <span>LinkedIn</span>}
              {personalInfo.github && <span>GitHub</span>}
              {personalInfo.website && <span>Website</span>}
            </div>
          </div>
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-12 grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 pt-1" style={{ color: "var(--theme-color, #9ca3af)" }}>About</h2>
          </div>
          <div className="col-span-3">
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{personalInfo.summary}</p>
          </div>
        </section>
      )}

      {/* Dynamic Sections */}
      {layout.map(renderSection)}
    </div>
  );
}
