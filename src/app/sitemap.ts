import { MetadataRoute } from 'next'
import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://careerhub.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base routes
  const routes = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/jobs`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/register`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ] as MetadataRoute.Sitemap;

  try {
    // Dynamic Jobs
    const jobs = await prisma.job.findMany({
      where: { isActive: true, isApproved: true },
      select: { id: true, updatedAt: true }
    });
    const jobRoutes = jobs.map((job) => ({
      url: `${BASE_URL}/jobs/${job.id}`,
      lastModified: job.updatedAt,
      changeFrequency: 'daily',
      priority: 0.7,
    })) as MetadataRoute.Sitemap;

    // Dynamic Portfolios
    const portfolios = await prisma.portfolio.findMany({
      where: { username: { not: null } },
      select: { username: true }
    });
    const portfolioRoutes = portfolios.map((portfolio) => ({
      url: `${BASE_URL}/p/${portfolio.username}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    })) as MetadataRoute.Sitemap;

    return [...routes, ...jobRoutes, ...portfolioRoutes];
  } catch (error) {
    return routes;
  }
}
