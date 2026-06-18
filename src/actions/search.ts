"use server";

import { prisma } from "@/lib/prisma";

export async function globalSearch(query: string, type: string = "all", page: number = 1, sort: string = "newest") {
  const take = 10;
  const skip = (page - 1) * take;
  const searchQuery = query.trim();

  let jobs: any[] = [];
  let companies: any[] = [];
  let blogs: any[] = [];

  const orderBy = sort === "newest" ? { createdAt: 'desc' } : { createdAt: 'asc' };

  try {
    // 1. Search Jobs
    if (type === "all" || type === "jobs") {
      jobs = await prisma.job.findMany({
        where: {
          isActive: true,
          isApproved: true,
          deletedAt: null,
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
            { location: { contains: searchQuery, mode: "insensitive" } }
          ]
        },
        include: { company: true },
        orderBy: orderBy as any,
        take,
        skip
      });
    }

    // 2. Search Companies
    if (type === "all" || type === "companies") {
      companies = await prisma.company.findMany({
        where: {
          verificationStatus: "VERIFIED",
          deletedAt: null,
          OR: [
            { name: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } }
          ]
        },
        orderBy: orderBy as any,
        take,
        skip
      });
    }

    // 3. Search Blogs (Including Interview Questions)
    if (type === "all" || type === "blogs") {
      blogs = await prisma.blogPost.findMany({
        where: {
          isPublished: true,
          deletedAt: null,
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" } },
            { content: { contains: searchQuery, mode: "insensitive" } }
          ]
        },
        include: { author: { select: { name: true } } },
        orderBy: orderBy as any,
        take,
        skip
      });
    }

    return { success: true, data: { jobs, companies, blogs } };
  } catch (error) {
    console.error("Search Error:", error);
    return { error: "Failed to perform search" };
  }
}
