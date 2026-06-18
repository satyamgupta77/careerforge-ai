import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Define the shape of our props
type Props = {
  params: { username: string };
};

// Next.js standard way to dynamically generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const portfolio = await prisma.portfolio.findUnique({
    where: { username: params.username },
    include: { user: true },
  });

  if (!portfolio) {
    return { title: "Portfolio Not Found" };
  }

  return {
    title: `${portfolio.user.name}'s Portfolio`,
    description: portfolio.bio || `View the professional portfolio of ${portfolio.user.name}.`,
    openGraph: {
      title: `${portfolio.user.name} | Professional Portfolio`,
      description: portfolio.bio || `Check out my skills, projects, and professional experience.`,
      url: `https://careerhub.com/p/${portfolio.username}`,
      siteName: 'CareerHub',
      images: [
        {
          url: portfolio.user.image || 'https://careerhub.com/og-default.png', // Assuming we have a default OG image
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function PortfolioPage({ params }: Props) {
  const portfolio = await prisma.portfolio.findUnique({
    where: { username: params.username },
    include: {
      user: true,
      skills: true,
      experiences: true,
      educations: true,
      projects: true,
    },
  });

  if (!portfolio) {
    notFound();
  }

  // Choose template
  const isDev = portfolio.template === "developer";

  return (
    <div className={`min-h-screen ${isDev ? 'bg-slate-950 text-slate-50 font-mono' : 'bg-slate-50 text-slate-900 font-sans'}`}>
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        
        {/* Header / Hero */}
        <section className="space-y-6">
          {portfolio.user.image && (
            <img src={portfolio.user.image} alt={portfolio.user.name} className="w-32 h-32 rounded-full border-4 border-primary shadow-lg object-cover" />
          )}
          <h1 className={`text-5xl font-extrabold tracking-tight ${isDev ? 'text-primary' : 'text-slate-900'}`}>
            {portfolio.user.name}
          </h1>
          <p className={`text-xl max-w-2xl leading-relaxed ${isDev ? 'text-slate-400' : 'text-slate-600'}`}>
            {portfolio.bio}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            {portfolio.github && <a href={portfolio.github} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-primary transition-colors">GitHub</a>}
            {portfolio.linkedin && <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-primary transition-colors">LinkedIn</a>}
            {portfolio.website && <a href={portfolio.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-primary transition-colors">Website</a>}
          </div>
        </section>

        {/* Skills */}
        {portfolio.skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold border-b pb-2 border-border/50">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map(skill => (
                <span key={skill.id} className={`px-4 py-2 rounded-lg text-sm font-medium ${isDev ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200 shadow-sm'}`}>
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {portfolio.projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold border-b pb-2 border-border/50">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {portfolio.projects.map(project => (
                <div key={project.id} className={`p-6 rounded-2xl ${isDev ? 'bg-slate-900 border border-slate-800' : 'bg-white shadow-md border border-slate-100'}`}>
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className={`text-sm mb-4 ${isDev ? 'text-slate-400' : 'text-slate-600'}`}>{project.description}</p>
                  <div className="flex gap-4">
                    {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">Live Demo</a>}
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">Source Code</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {portfolio.experiences.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold border-b pb-2 border-border/50">Experience</h2>
            <div className="space-y-8">
              {portfolio.experiences.map(exp => (
                <div key={exp.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-primary">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <div className={`text-sm font-medium mb-2 ${isDev ? 'text-slate-400' : 'text-slate-500'}`}>
                    {exp.company} • {new Date(exp.startDate).getFullYear()} - {exp.isCurrent ? 'Present' : new Date(exp.endDate!).getFullYear()}
                  </div>
                  {exp.description && <p className={`text-sm ${isDev ? 'text-slate-300' : 'text-slate-600'}`}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
