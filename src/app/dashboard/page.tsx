import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function DashboardRedirect() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const role = session.user?.role;

  if (role === "ADMIN") {
    redirect("/admin");
  } else if (role === "COMPANY") {
    redirect("/company");
  } else {
    // Default to candidate dashboard
    redirect("/candidate");
  }
}
