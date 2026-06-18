import { ResumeData } from "@/store/useResumeStore";

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, experience, skills, projects, certifications, languages, layout } = data;

  const renderSection = (section: string) => {
    switch (section) {
      case "experience":
        if (experience.length === 0) return null;
        return (
          <section key="experience" className="mb-6">
            <h2 className="text-xl font-bold uppercase border-b-2 border-gray-800 mb-3 pb-1" style={{ color: "var(--theme-color, #1f2937)", borderColor: "var(--theme-color, #1f2937)" }}>Experience</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>{exp.role}</span>
                    <span>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <div className="italic text-gray-700 mb-1">{exp.company}</div>
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "education":
        if (education.length === 0) return null;
        return (
          <section key="education" className="mb-6">
            <h2 className="text-xl font-bold uppercase border-b-2 border-gray-800 mb-3 pb-1" style={{ color: "var(--theme-color, #1f2937)", borderColor: "var(--theme-color, #1f2937)" }}>Education</h2>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>{edu.degree}</span>
                    <span>{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="italic text-gray-700">{edu.school}</div>
                  {edu.description && <p className="text-sm mt-1 text-gray-800">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );
      case "projects":
        if (projects.length === 0) return null;
        return (
          <section key="projects" className="mb-6">
            <h2 className="text-xl font-bold uppercase border-b-2 border-gray-800 mb-3 pb-1" style={{ color: "var(--theme-color, #1f2937)", borderColor: "var(--theme-color, #1f2937)" }}>Projects</h2>
            <div className="space-y-3">
              {projects.map(proj => (
                <div key={proj.id}>
                  <div className="font-bold text-gray-900">
                    {proj.name} {proj.url && <span className="font-normal text-sm text-gray-600">({proj.url})</span>}
                  </div>
                  <p className="text-sm mt-1 text-gray-800 whitespace-pre-wrap">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "skills":
        if (skills.length === 0) return null;
        return (
          <section key="skills" className="mb-6">
            <h2 className="text-xl font-bold uppercase border-b-2 border-gray-800 mb-3 pb-1" style={{ color: "var(--theme-color, #1f2937)", borderColor: "var(--theme-color, #1f2937)" }}>Skills</h2>
            <p className="text-sm text-gray-800">
              {skills.map(s => s.name).join(", ")}
            </p>
          </section>
        );
      case "certifications":
        if (certifications.length === 0) return null;
        return (
          <section key="certifications" className="mb-6">
            <h2 className="text-xl font-bold uppercase border-b-2 border-gray-800 mb-3 pb-1" style={{ color: "var(--theme-color, #1f2937)", borderColor: "var(--theme-color, #1f2937)" }}>Certifications</h2>
            <div className="space-y-2">
              {certifications.map(cert => (
                <div key={cert.id} className="text-sm text-gray-800">
                  <span className="font-bold text-gray-900">{cert.name}</span> — {cert.issuer} ({cert.date})
                  {cert.url && <a href={cert.url} className="ml-2 text-blue-600 underline">Link</a>}
                </div>
              ))}
            </div>
          </section>
        );
      case "languages":
        if (languages.length === 0) return null;
        return (
          <section key="languages" className="mb-6">
            <h2 className="text-xl font-bold uppercase border-b-2 border-gray-800 mb-3 pb-1" style={{ color: "var(--theme-color, #1f2937)", borderColor: "var(--theme-color, #1f2937)" }}>Languages</h2>
            <p className="text-sm text-gray-800">
              {languages.map(l => `${l.name} (${l.proficiency})`).join(" • ")}
            </p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-10 bg-white min-h-[297mm] text-gray-900 leading-normal" style={{ fontFamily: "var(--font-family, 'Times New Roman', serif)" }}>
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-2" style={{ color: "var(--theme-color, #1f2937)" }}>
          {personalInfo.name || "Your Name"}
        </h1>
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.address && <span>| {personalInfo.address}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>| {personalInfo.github}</span>}
          {personalInfo.website && <span>| {personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-sm text-gray-800 whitespace-pre-wrap">{personalInfo.summary}</p>
        </section>
      )}

      {/* Dynamic Sections */}
      {layout.map(renderSection)}
    </div>
  );
}
