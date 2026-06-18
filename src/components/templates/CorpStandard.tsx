import React from "react";

export default function CorpStandard({ data, themeColor, fontFamily }: { data: any, themeColor: string, fontFamily: string }) {
  if (!data) return <div className="p-10 text-center">No data provided</div>;

  return (
    <div style={{ fontFamily, color: "#000", lineHeight: 1.5 }} className="p-8 max-w-[800px] mx-auto bg-white shadow-xl min-h-[1056px]">
      <header className="mb-6">
        <h1 className="text-3xl font-bold uppercase">{data.personalInfo?.fullName || "Your Name"}</h1>
        <p className="text-md border-b-2 pb-2 mb-2" style={{ borderColor: themeColor }}>{data.personalInfo?.email} • {data.personalInfo?.phone}</p>
      </header>

      <section className="mb-6">
        <p className="text-sm">{data.personalInfo?.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase bg-gray-100 p-1 mb-3" style={{ borderLeft: `4px solid ${themeColor}` }}>Experience</h2>
        <div className="space-y-4">
          {data.experience?.map((exp: any) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline font-bold">
                <span>{exp.company}</span>
                <span>{exp.date}</span>
              </div>
              <div className="italic text-sm mb-1">{exp.role}</div>
              <div className="text-sm pl-4 list-outside list-disc" dangerouslySetInnerHTML={{ __html: exp.description }} />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase bg-gray-100 p-1 mb-3" style={{ borderLeft: `4px solid ${themeColor}` }}>Education</h2>
        <div className="space-y-2">
          {data.education?.map((edu: any) => (
            <div key={edu.id} className="flex justify-between items-baseline text-sm">
              <span className="font-bold">{edu.school}</span>
              <span>{edu.degree} • {edu.date}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold uppercase bg-gray-100 p-1 mb-3" style={{ borderLeft: `4px solid ${themeColor}` }}>Skills</h2>
        <p className="text-sm">{data.skills}</p>
      </section>
    </div>
  );
}
