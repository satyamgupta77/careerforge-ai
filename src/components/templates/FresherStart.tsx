import React from "react";

export default function FresherStart({ data, themeColor, fontFamily }: { data: any, themeColor: string, fontFamily: string }) {
  if (!data) return <div className="p-10 text-center">No data provided</div>;

  return (
    <div style={{ fontFamily, color: "#333", lineHeight: 1.6 }} className="p-10 max-w-[800px] mx-auto bg-white shadow-xl min-h-[1056px]">
      <header className="text-center mb-8">
        <div className="inline-block border-4 p-4 mb-4" style={{ borderColor: themeColor }}>
          <h1 className="text-4xl font-black uppercase tracking-widest">{data.personalInfo?.fullName || "Your Name"}</h1>
        </div>
        <div className="flex justify-center gap-4 text-sm font-medium">
          <span>{data.personalInfo?.email}</span>
          <span>{data.personalInfo?.phone}</span>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-4 h-4" style={{ backgroundColor: themeColor }}></span> Summary
        </h2>
        <p className="text-sm text-justify">{data.personalInfo?.summary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-4 h-4" style={{ backgroundColor: themeColor }}></span> Education First
        </h2>
        <div className="space-y-4 border-l-2 pl-4" style={{ borderColor: themeColor }}>
          {data.education?.map((edu: any) => (
            <div key={edu.id}>
              <h3 className="font-bold text-lg">{edu.degree}</h3>
              <p className="text-sm font-semibold">{edu.school} • {edu.date}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-4 h-4" style={{ backgroundColor: themeColor }}></span> Projects & Experience
        </h2>
        <div className="space-y-6">
          {data.projects?.map((proj: any) => (
            <div key={proj.id}>
              <h3 className="font-bold">{proj.name}</h3>
              <div className="text-sm list-outside list-disc pl-4" dangerouslySetInnerHTML={{ __html: proj.description }} />
            </div>
          ))}
          {data.experience?.map((exp: any) => (
            <div key={exp.id}>
              <h3 className="font-bold">{exp.role} at {exp.company} ({exp.date})</h3>
              <div className="text-sm list-outside list-disc pl-4" dangerouslySetInnerHTML={{ __html: exp.description }} />
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-4 h-4" style={{ backgroundColor: themeColor }}></span> Skills
        </h2>
        <p className="text-sm">{data.skills}</p>
      </section>
    </div>
  );
}
