import dynamic from "next/dynamic";

export const TEMPLATES = [
  {
    id: "dev-minimal",
    name: "Minimal Developer",
    category: "Developer",
    component: dynamic(() => import('@/components/templates/DevMinimal'))
  },
  {
    id: "corp-exec",
    name: "Executive Leader",
    category: "Executive",
    component: dynamic(() => import('@/components/templates/CorpExec'))
  },
  {
    id: "creative-pro",
    name: "Creative Professional",
    category: "Creative",
    component: dynamic(() => import('@/components/templates/CreativePro'))
  },
  {
    id: "fresher-start",
    name: "Entry Level Start",
    category: "Fresher",
    component: dynamic(() => import('@/components/templates/FresherStart'))
  },
  {
    id: "corp-standard",
    name: "Corporate Standard",
    category: "Corporate",
    component: dynamic(() => import('@/components/templates/CorpStandard'))
  }
];

export const FONT_OPTIONS = [
  "Inter", "Roboto", "Open Sans", "Merriweather", "Playfair Display", "Monospace"
];
