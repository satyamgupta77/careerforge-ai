import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CareerHub - AI Powered Career Accelerator",
  description: "Land your dream job with AI-powered resume building, ATS checking, and interview prep.",
  keywords: ["jobs", "career", "AI resume", "ATS checker", "portfolio builder", "tech jobs"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://careerhub.com",
    title: "CareerHub | Modern AI Job Portal",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased text-foreground bg-background font-sans">
        <Navbar />
        {children}
        
        {/* Mock Analytics & Error Tracking Scripts */}
        {process.env.NODE_ENV === "production" && (
          <>
            <script defer src="/_mock-analytics/script.js" data-website-id="mock-id" />
            <script defer src="https://js.sentry-cdn.com/mock-id.min.js" crossOrigin="anonymous" />
          </>
        )}
      </body>
    </html>
  );
}
