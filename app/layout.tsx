import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CareerPilot AI",
    template: "%s | CareerPilot AI",
  },
  description:
    "AI-powered Resume Analyzer that helps users improve ATS scores, identify missing skills, and build job-winning resumes.",

  keywords: [
    "CareerPilot AI",
    "Resume Analyzer",
    "ATS Resume Checker",
    "AI Resume Review",
    "Resume Builder",
    "Job Search",
    "Next.js",
  ],

  authors: [
    {
      name: "CareerPilot AI Team",
    },
  ],

  creator: "CareerPilot AI",
  applicationName: "CareerPilot AI",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },

  openGraph: {
    title: "CareerPilot AI",
    description:
      "AI-powered Resume Analyzer for ATS optimization and career growth.",
    siteName: "CareerPilot AI",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "CareerPilot AI Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CareerPilot AI",
    description:
      "AI-powered Resume Analyzer for ATS optimization and career growth.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}