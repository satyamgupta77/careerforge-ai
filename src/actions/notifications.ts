"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getUnreadNotifications() {
  const session = await auth();
  if (!session?.user?.id) return { success: false, data: [] };

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: session.user.id, isRead: false },
      orderBy: { createdAt: "desc" },
      take: 10
    });
    return { success: true, data: notifications };
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function markAsRead(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false };

  try {
    await prisma.notification.update({
      where: { id, userId: session.user.id },
      data: { isRead: true }
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function markAllAsRead() {
  const session = await auth();
  if (!session?.user?.id) return { success: false };

  try {
    await prisma.notification.updateMany({
      where: { userId: session.user.id, isRead: false },
      data: { isRead: true }
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
