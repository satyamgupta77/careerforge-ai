"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getPrimaryResume() {
  const session = await auth();
  if (!session?.user?.id) return null;

  try {
    return await prisma.resume.findFirst({
      where: {
        userId: session.user.id,
        isPrimary: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch primary resume:", error);
    return null;
  }
}
