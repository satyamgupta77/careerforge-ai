import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const protectedRoutes = ["/dashboard"];
const adminRoutes = ["/dashboard/admin"];
const companyRoutes = ["/dashboard/company"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  const isProtectedRoute = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => nextUrl.pathname.startsWith(route));
  const isCompanyRoute = companyRoutes.some((route) => nextUrl.pathname.startsWith(route));
  const isAuthRoute = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register");
  const isApiRoute = nextUrl.pathname.startsWith("/api");

  // Basic Mock Rate Limiting for API routes
  if (isApiRoute) {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    // In production, use Upstash Redis: await redis.incr(ip) > LIMIT ...
    // For MVP, we pass through but leave the architectural stub.
    req.headers.set("X-RateLimit-Limit", "100");
    req.headers.set("X-RateLimit-Remaining", "99");
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && isProtectedRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  if (isLoggedIn) {
    if (isAdminRoute && role !== "ADMIN") {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }

    if (isCompanyRoute && role !== "COMPANY" && role !== "ADMIN") {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
