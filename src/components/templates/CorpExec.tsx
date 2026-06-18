import React from "react";

export default function CorpExec({ data, themeColor, fontFamily }: { data: any, themeColor: string, fontFamily: string }) {
  if (!data) return <div className="p-10 text-center">No resume data provided</div>;

  return (
    <div style={{ fontFamily, color: "#1f2937", lineHeight: 1.5 }} className="p-10 max-w-[800px] mx-auto bg-white shadow-xl min-h-[1056px]">
      <header className="text-center border-b border-gray-300 pb-6 mb-8">
        <h1 className="text-5xl font-serif tracking-tight mb-2" style={{ color: themeColor }}>
          {data.personalInfo?.fullName?.toUpperCase() || "YOUR NAME"}
        </h1>
        <div className="flex justify-center gap-4 text-sm text-gray-500 uppercase tracking-widest">
          <span>{data.personalInfo?.email}</span>
          <span>|</span>
          <span>{data.personalInfo?.phone}</span>
        </div>
      </header>

      <section className="mb-8">
        <p className="text-sm leading-relaxed text-justify font-serif">{data.personalInfo?.summary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-200 pb-2 mb-4" style={{ color: themeColor }}>Core Competencies</h2>
        <p className="text-sm text-center font-medium">{data.skills}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-200 pb-2 mb-4" style={{ color: themeColor }}>Professional Experience</h2>
        <div className="space-y-6">
          {data.experience?.map((exp: any) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-lg">{exp.company}</h3>
                <span className="text-sm font-semibold">{exp.date}</span>
              </div>
              <div className="italic text-sm text-gray-600 mb-2">{exp.role}</div>
              <div className="text-sm pl-4 list-outside list-disc" dangerouslySetInnerHTML={{ __html: exp.description }} />
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-200 pb-2 mb-4" style={{ color: themeColor }}>Education & Credentials</h2>
        <div className="space-y-2">
          {data.education?.map((edu: any) => (
            <div key={edu.id} className="text-sm">
              <span className="font-bold">{edu.degree}</span> — {edu.school} ({edu.date})
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
