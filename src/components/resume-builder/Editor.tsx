"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AIEnhanceButton from "./AIEnhanceButton";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import CertificationsSection from "./CertificationsSection";
import LanguagesSection from "./LanguagesSection";

export default function Editor() {
  const { data, updatePersonalInfo } = useResumeStore();

  return (
    <div className="space-y-8 max-w-2xl mx-auto pb-20">
      {/* Personal Info Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b border-border pb-2">Personal Information</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input 
              value={data.personalInfo.name} 
              onChange={(e) => updatePersonalInfo({ name: e.target.value })} 
              placeholder="John Doe" 
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input 
              value={data.personalInfo.email} 
              onChange={(e) => updatePersonalInfo({ email: e.target.value })} 
              placeholder="john@example.com" 
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input 
              value={data.personalInfo.phone} 
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })} 
              placeholder="+1 (555) 000-0000" 
            />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input 
              value={data.personalInfo.address} 
              onChange={(e) => updatePersonalInfo({ address: e.target.value })} 
              placeholder="City, Country" 
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label>Professional Summary</Label>
            <Textarea 
              value={data.personalInfo.summary} 
              onChange={(e) => updatePersonalInfo({ summary: e.target.value })} 
              placeholder="A brief summary of your professional background..."
              rows={4}
            />
            <div className="flex justify-end pt-1">
              <AIEnhanceButton 
                currentText={data.personalInfo.summary} 
                type="summary" 
                onAccept={(newText) => updatePersonalInfo({ summary: newText })} 
              />
            </div>
          </div>
        </div>
      </section>

      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <SkillsSection />
      
      {/* Certifications Section */}
      <CertificationsSection />
      
      {/* Languages Section */}
      <LanguagesSection />
    </div>
  );
}
