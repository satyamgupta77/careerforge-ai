import React from "react";

export default function DevMinimal({ data, themeColor, fontFamily }: { data: any, themeColor: string, fontFamily: string }) {
  if (!data) return <div className="p-10 text-center">No resume data provided</div>;

  return (
    <div style={{ fontFamily, color: "#333", lineHeight: 1.6 }} className="p-8 max-w-[800px] mx-auto bg-white shadow-xl min-h-[1056px]">
      <header className="border-b-2 pb-4 mb-6" style={{ borderColor: themeColor }}>
        <h1 className="text-4xl font-black tracking-tight" style={{ color: themeColor }}>
          {data.personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-lg font-medium mt-1">{data.personalInfo?.title || "Target Role"}</p>
        <div className="flex gap-4 mt-2 text-sm text-gray-600">
          <span>{data.personalInfo?.email}</span>
          <span>•</span>
          <span>{data.personalInfo?.phone}</span>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: themeColor }}>Summary</h2>
        <p className="text-sm">{data.personalInfo?.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: themeColor }}>Skills</h2>
        <div className="text-sm font-mono bg-gray-50 p-3 rounded border border-gray-200">
          {data.skills || "React, TypeScript, Node.js"}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold uppercase tracking-wider mb-4" style={{ color: themeColor }}>Experience</h2>
        <div className="space-y-6">
          {data.experience?.map((exp: any) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-lg">{exp.role}</h3>
                <span className="text-sm text-gray-500 font-medium">{exp.date}</span>
              </div>
              <div className="text-md font-medium text-gray-700 mb-2">{exp.company}</div>
              <div className="text-sm prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: exp.description }} />
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-bold uppercase tracking-wider mb-4" style={{ color: themeColor }}>Education</h2>
        <div className="space-y-4">
          {data.education?.map((edu: any) => (
            <div key={edu.id} className="flex justify-between items-baseline">
              <div>
                <h3 className="font-bold">{edu.degree}</h3>
                <div className="text-sm text-gray-600">{edu.school}</div>
              </div>
              <span className="text-sm text-gray-500">{edu.date}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
