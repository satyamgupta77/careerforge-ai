import React from "react";

export default function CreativePro({ data, themeColor, fontFamily }: { data: any, themeColor: string, fontFamily: string }) {
  if (!data) return <div className="p-10 text-center">No data provided</div>;

  return (
    <div style={{ fontFamily, color: "#444" }} className="flex max-w-[800px] mx-auto bg-white shadow-xl min-h-[1056px]">
      {/* Sidebar */}
      <div className="w-1/3 p-8 text-white" style={{ backgroundColor: themeColor }}>
        <h1 className="text-3xl font-black mb-2">{data.personalInfo?.fullName || "Your Name"}</h1>
        <p className="text-sm font-semibold opacity-90 mb-8">{data.personalInfo?.title || "Role"}</p>
        
        <div className="space-y-2 text-sm mb-8 opacity-80">
          <p>{data.personalInfo?.email}</p>
          <p>{data.personalInfo?.phone}</p>
        </div>

        <h2 className="text-lg font-bold border-b border-white/20 pb-1 mb-3 uppercase">Skills</h2>
        <p className="text-sm opacity-90 leading-relaxed">{data.skills}</p>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2 uppercase" style={{ color: themeColor }}>Profile</h2>
          <p className="text-sm leading-relaxed">{data.personalInfo?.summary}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 uppercase" style={{ color: themeColor }}>Experience</h2>
          <div className="space-y-6">
            {data.experience?.map((exp: any) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-lg text-black">{exp.role}</h3>
                  <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded">{exp.date}</span>
                </div>
                <div className="text-sm font-semibold mb-2" style={{ color: themeColor }}>{exp.company}</div>
                <div className="text-sm pl-4 list-outside list-disc" dangerouslySetInnerHTML={{ __html: exp.description }} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 uppercase" style={{ color: themeColor }}>Education</h2>
          <div className="space-y-4">
            {data.education?.map((edu: any) => (
              <div key={edu.id}>
                <h3 className="font-bold text-black">{edu.degree}</h3>
                <p className="text-sm">{edu.school} • {edu.date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
