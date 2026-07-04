import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import LogoutButton from "@/components/LogoutButton";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ResumeUploader from "@/components/resume/ResumeUploader";
import ResumeList from "@/components/resume/ResumeList";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const resumes = await prisma.resume.findMany({
    where: {
      userId: (session.user as any).id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const latestResume = resumes.find(
    (resume) => resume.atsScore !== null
  );

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                Welcome back, {session.user?.name} 👋
              </h1>

              <p className="text-gray-500 mt-3 text-lg">
                Upload your resume, analyze it using AI, and improve your ATS score.
              </p>
            </div>

            <LogoutButton />

          </div>

        </div>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <DashboardCard
            title="Latest ATS Score"
            value={
              latestResume?.atsScore !== null &&
              latestResume?.atsScore !== undefined
                ? `${latestResume.atsScore}%`
                : "--"
            }
          />

          <DashboardCard
            title="Resumes Uploaded"
            value={resumes.length}
          />

          <DashboardCard
            title="AI Analysis"
            value={latestResume ? "Completed" : "Pending"}
          />

          <DashboardCard
            title="Status"
            value="Active"
          />

        </div>

        {/* Upload Resume */}

        <div className="mt-10">
          <ResumeUploader />
        </div>

        {/* Resume Library */}

        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                My Resume Library
              </h2>

              <p className="text-gray-500 mt-2">
                Search, view, download, and manage your uploaded resumes.
              </p>
            </div>

            <div className="mt-4 md:mt-0 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium">
              {resumes.length} Resume{resumes.length !== 1 ? "s" : ""}
            </div>

          </div>

          <ResumeList resumes={resumes} />

        </div>

      </div>
    </main>
  );
}