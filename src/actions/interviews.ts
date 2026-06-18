"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getInterviews() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, data: [] };

  try {
    // Mocking until Interview model is added to schema
    const interviews: any[] = [];
    return { success: true, data: interviews };
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function scheduleInterview(data: any) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    // Mocking
    const interview = { id: "mock", ...data };

    revalidatePath("/candidate/interviews");
    return { success: true, data: interview };
  } catch (error) {
    return { error: "Failed to schedule interview" };
  }
}

export async function updateInterviewStatus(id: string, status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "NO_SHOW") {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    // Mocking
    revalidatePath("/candidate/interviews");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update status" };
  }
}

export async function saveInterviewReport(id: string, notes: string, rating: number) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    // Mocking
    revalidatePath("/candidate/interviews");
    return { success: true };
  } catch (error) {
    return { error: "Failed to save report" };
  }
}

export async function deleteInterview(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    // Mocking
    revalidatePath("/candidate/interviews");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete interview" };
  }
}
