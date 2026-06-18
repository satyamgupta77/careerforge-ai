"use client";

import { useResumeStore } from "@/store/useResumeStore";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";

export default function LivePreview() {
  const { data } = useResumeStore();
  const { templateId, themeColor, fontFamily } = data.design || { templateId: "modern", themeColor: "#000000", fontFamily: "Inter" };

  const renderTemplate = () => {
    switch (templateId) {
      case "classic":
        return <ClassicTemplate data={data} />;
      case "minimal":
        return <MinimalTemplate data={data} />;
      case "professional":
        return <ProfessionalTemplate data={data} />;
      case "modern":
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div 
      className="w-full h-full"
      style={{
        "--theme-color": themeColor,
        "--font-family": `"${fontFamily}", sans-serif`
      } as React.CSSProperties}
    >
      {renderTemplate()}
    </div>
  );
}
