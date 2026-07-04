import { Toaster } from "sonner";
import type { Metadata } from "next";
import Providers from "./providers";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CareerPilot AI",
    template: "%s | CareerPilot AI",
  },
  description:
    "AI-powered ATS Resume Analyzer that helps job seekers improve resumes and land interviews.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html
  lang="en"
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
>
  <body className="min-h-full flex flex-col">
  <Providers>
    {children}
  </Providers>
  <Toaster
    position="top-right"
    richColors
  />
</body>
</html>
);
}

