import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // Ensure route isn't statically cached

export async function GET(request: Request) {
  // Verify Vercel Cron authentication via headers
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();

    // Find jobs that have passed their expiry date and are still active
    const expiredJobs = await prisma.job.updateMany({
      where: {
        isActive: true,
        expiresAt: {
          lte: now, // Less than or equal to current date/time
        },
      },
      data: {
        isActive: false,
      },
    });

    console.log(`[Cron] Successfully expired ${expiredJobs.count} jobs.`);

    return NextResponse.json({
      success: true,
      message: `Expired ${expiredJobs.count} jobs successfully.`,
    });
  } catch (error) {
    console.error("[Cron] Job expiry failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
