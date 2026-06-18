"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function verifyAdmin() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

export async function getPlatformSettings() {
  await verifyAdmin();
  let settings = await prisma.platformSettings.findUnique({
    where: { id: "global" }
  });

  if (!settings) {
    settings = await prisma.platformSettings.create({
      data: { id: "global" }
    });
  }
  return settings;
}

export async function updatePlatformSettings(data: any) {
  await verifyAdmin();
  try {
    await prisma.platformSettings.upsert({
      where: { id: "global" },
      update: data,
      create: { id: "global", ...data }
    });
    revalidatePath("/admin/settings");
    return { success: true, message: "Settings saved successfully." };
  } catch (error) {
    return { error: "Failed to update settings." };
  }
}
