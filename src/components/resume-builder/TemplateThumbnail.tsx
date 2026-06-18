"use client";

import { useResumeStore, ResumeData } from "@/store/useResumeStore";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";

interface TemplateThumbnailProps {
  templateId: string;
  themeColor: string;
  fontFamily?: string;
}

const DUMMY_DATA: ResumeData = {
  personalInfo: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    address: "New York, NY",
    summary: "Experienced software engineer with a passion for building scalable web applications.",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    website: "johndoe.com",
  },
  education: [
    { id: "1", school: "University of Technology", degree: "B.S. Computer Science", startDate: "2015", endDate: "2019", description: "" }
  ],
  experience: [
    { id: "1", company: "Tech Corp", role: "Senior Developer", startDate: "2020", endDate: "Present", current: true, description: "Led development of core microservices." },
    { id: "2", company: "Startup Inc", role: "Web Developer", startDate: "2019", endDate: "2020", current: false, description: "Built frontend application using React." }
  ],
  skills: [
    { id: "1", name: "JavaScript" }, { id: "2", name: "TypeScript" }, { id: "3", name: "React" }, { id: "4", name: "Node.js" }
  ],
  projects: [
    { id: "1", name: "E-commerce Platform", description: "A full-stack e-commerce solution.", url: "" }
  ],
  certifications: [
    { id: "1", name: "AWS Certified Developer", issuer: "Amazon", date: "2022", url: "" }
  ],
  languages: [
    { id: "1", name: "English", proficiency: "Native" }
  ],
  layout: ["personalInfo", "experience", "education", "projects", "skills"], // Keeping layout simple for thumbnail
  design: {
    templateId: "modern",
    themeColor: "#000000",
    fontFamily: "Inter"
  }
};

export default function TemplateThumbnail({ templateId, themeColor, fontFamily = "Inter" }: TemplateThumbnailProps) {
  const renderTemplate = () => {
    switch (templateId) {
      case "classic":
        return <ClassicTemplate data={DUMMY_DATA} />;
      case "minimal":
        return <MinimalTemplate data={DUMMY_DATA} />;
      case "professional":
        return <ProfessionalTemplate data={DUMMY_DATA} />;
      case "modern":
      default:
        return <ModernTemplate data={DUMMY_DATA} />;
    }
  };

  return (
    <div className="w-full h-full overflow-hidden flex items-start justify-center bg-gray-100 pointer-events-none select-none">
      <div 
        className="origin-top bg-white shadow-sm"
        style={{
          width: "210mm",
          minHeight: "297mm",
          transform: "scale(0.25)",
          "--theme-color": themeColor,
          "--font-family": `"${fontFamily}", sans-serif`
        } as React.CSSProperties}
      >
        {renderTemplate()}
      </div>
    </div>
  );
}
