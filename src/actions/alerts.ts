"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getUserAlerts() {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const alerts = await prisma.jobAlert.findMany({
      where: { userId: session.user.id }
    });
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { telegramChatId: true }
    });
    return { success: true, alerts, telegramChatId: user?.telegramChatId };
  } catch (error) {
    return { error: "Failed to fetch alerts" };
  }
}

export async function addJobAlert(keyword: string, notifyEmail: boolean, notifyTelegram: boolean) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    await prisma.jobAlert.create({
      data: {
        userId: session.user.id,
        keyword,
        notifyEmail,
        notifyTelegram
      }
    });
    revalidatePath("/candidate/alerts");
    return { success: true };
  } catch (error) {
    return { error: "Failed to add alert" };
  }
}

export async function removeJobAlert(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    await prisma.jobAlert.delete({
      where: { id, userId: session.user.id }
    });
    revalidatePath("/candidate/alerts");
    return { success: true };
  } catch (error) {
    return { error: "Failed to remove alert" };
  }
}

export async function updateTelegramChatId(chatId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { telegramChatId: chatId }
    });
    revalidatePath("/candidate/alerts");
    return { success: true, message: "Telegram Chat ID updated." };
  } catch (error) {
    return { error: "Failed to update Chat ID" };
  }
}
