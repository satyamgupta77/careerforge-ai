import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
    linkedin: string;
    github: string;
    website: string;
  };
  education: {
    id: string;
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  experience: {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  skills: {
    id: string;
    name: string;
  }[];
  projects: {
    id: string;
    name: string;
    description: string;
    url: string;
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    url: string;
  }[];
  languages: {
    id: string;
    name: string;
    proficiency: string;
  }[];
  layout: string[]; // Order of sections
  design: {
    templateId: string;
    themeColor: string;
    fontFamily: string;
  };
}

interface ResumeState {
  data: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData["personalInfo"]>) => void;
  updateDesign: (design: Partial<ResumeData["design"]>) => void;
  
  // Education Actions
  addEducation: () => void;
  updateEducation: (id: string, edu: Partial<ResumeData["education"][0]>) => void;
  removeEducation: (id: string) => void;
  
  // Experience Actions
  addExperience: () => void;
  updateExperience: (id: string, exp: Partial<ResumeData["experience"][0]>) => void;
  removeExperience: (id: string) => void;

  // Skills Actions
  addSkill: (name: string) => void;
  removeSkill: (id: string) => void;

  // Projects Actions
  addProject: () => void;
  updateProject: (id: string, proj: Partial<ResumeData["projects"][0]>) => void;
  removeProject: (id: string) => void;

  // Certifications Actions
  addCertification: () => void;
  updateCertification: (id: string, cert: Partial<ResumeData["certifications"][0]>) => void;
  removeCertification: (id: string) => void;

  // Languages Actions
  addLanguage: () => void;
  updateLanguage: (id: string, lang: Partial<ResumeData["languages"][0]>) => void;
  removeLanguage: (id: string) => void;

  // General Actions
  setResumeData: (data: ResumeData) => void;
}

const initialData: ResumeData = {
  personalInfo: { name: "", email: "", phone: "", address: "", summary: "", linkedin: "", github: "", website: "" },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  layout: ["personalInfo", "experience", "education", "projects", "skills", "certifications", "languages"],
  design: {
    templateId: "modern",
    themeColor: "#000000",
    fontFamily: "Inter",
  },
};

export const useResumeStore = create<ResumeState>((set) => ({
  data: initialData,

  updatePersonalInfo: (info) => set((state) => ({
    data: { ...state.data, personalInfo: { ...state.data.personalInfo, ...info } }
  })),

  updateDesign: (design) => set((state) => ({
    data: { ...state.data, design: { ...state.data.design, ...design } }
  })),

  addEducation: () => set((state) => ({
    data: { ...state.data, education: [...state.data.education, { id: uuidv4(), school: "", degree: "", startDate: "", endDate: "", description: "" }] }
  })),
  updateEducation: (id, edu) => set((state) => ({
    data: { ...state.data, education: state.data.education.map(e => e.id === id ? { ...e, ...edu } : e) }
  })),
  removeEducation: (id) => set((state) => ({
    data: { ...state.data, education: state.data.education.filter(e => e.id !== id) }
  })),

  addExperience: () => set((state) => ({
    data: { ...state.data, experience: [...state.data.experience, { id: uuidv4(), company: "", role: "", startDate: "", endDate: "", current: false, description: "" }] }
  })),
  updateExperience: (id, exp) => set((state) => ({
    data: { ...state.data, experience: state.data.experience.map(e => e.id === id ? { ...e, ...exp } : e) }
  })),
  removeExperience: (id) => set((state) => ({
    data: { ...state.data, experience: state.data.experience.filter(e => e.id !== id) }
  })),

  addSkill: (name) => set((state) => ({
    data: { ...state.data, skills: [...state.data.skills, { id: uuidv4(), name }] }
  })),
  removeSkill: (id) => set((state) => ({
    data: { ...state.data, skills: state.data.skills.filter(s => s.id !== id) }
  })),

  addProject: () => set((state) => ({
    data: { ...state.data, projects: [...state.data.projects, { id: uuidv4(), name: "", description: "", url: "" }] }
  })),
  updateProject: (id, proj) => set((state) => ({
    data: { ...state.data, projects: state.data.projects.map(p => p.id === id ? { ...p, ...proj } : p) }
  })),
  removeProject: (id) => set((state) => ({
    data: { ...state.data, projects: state.data.projects.filter(p => p.id !== id) }
  })),

  addCertification: () => set((state) => ({
    data: { ...state.data, certifications: [...state.data.certifications, { id: uuidv4(), name: "", issuer: "", date: "", url: "" }] }
  })),
  updateCertification: (id, cert) => set((state) => ({
    data: { ...state.data, certifications: state.data.certifications.map(c => c.id === id ? { ...c, ...cert } : c) }
  })),
  removeCertification: (id) => set((state) => ({
    data: { ...state.data, certifications: state.data.certifications.filter(c => c.id !== id) }
  })),

  addLanguage: () => set((state) => ({
    data: { ...state.data, languages: [...state.data.languages, { id: uuidv4(), name: "", proficiency: "" }] }
  })),
  updateLanguage: (id, lang) => set((state) => ({
    data: { ...state.data, languages: state.data.languages.map(l => l.id === id ? { ...l, ...lang } : l) }
  })),
  removeLanguage: (id) => set((state) => ({
    data: { ...state.data, languages: state.data.languages.filter(l => l.id !== id) }
  })),

  setResumeData: (data) => set({ data }),
}));
