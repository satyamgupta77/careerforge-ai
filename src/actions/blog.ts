"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function verifyAdmin() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") throw new Error("Unauthorized");
  return session.user.id;
}

export async function createBlogPost(data: any) {
  const adminId = await verifyAdmin();
  try {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: `${slug}-${Date.now()}`, // Ensure uniqueness
        content: data.content,
        excerpt: data.excerpt,
        category: data.category,
        isPublished: data.isPublished,
        authorId: adminId
      }
    });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create post" };
  }
}

export async function updateBlogPost(id: string, data: any) {
  await verifyAdmin();
  try {
    await prisma.blogPost.update({
      where: { id },
      data
    });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    if (data.slug) revalidatePath(`/blog/${data.slug}`);
    return { success: true };
  } catch (error) {
    return { error: "Failed to update post" };
  }
}

export async function deleteBlogPost(id: string) {
  await verifyAdmin();
  try {
    await prisma.blogPost.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete post" };
  }
}
