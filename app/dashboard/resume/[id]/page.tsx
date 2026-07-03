import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

import DashboardCard from "@/components/dashboard/DashboardCard";
import ResumeUploader from "@/components/resume/ResumeUploader";

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

  const latestResume = resumes.find((resume) => resume.atsScore !== null);

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold mb-2">
        Welcome, {session.user?.name} 👋
      </h1>

      <p className="text-gray-600 mb-8">
        CareerPilot AI Dashboard
      </p>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          value={resumes.length.toString()}
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

      {/* Resume Upload */}
      <div className="mt-10">
        <ResumeUploader />
      </div>

      {/* Resume List */}
      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6">
          My Resumes
        </h2>

        {resumes.length === 0 ? (
          <p className="text-gray-500">
            No resumes uploaded yet.
          </p>
        ) : (
          <div className="space-y-4">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="flex items-center justify-between border rounded-lg p-4 hover:bg-slate-50 transition"
              >
                <div>
                  <h3 className="font-semibold">
                    {resume.title}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    ATS Score:{" "}
                    {resume.atsScore !== null
                      ? `${resume.atsScore}%`
                      : "Not analyzed"}
                  </p>
                </div>

                <Link
                  href={`/dashboard/resume/${resume.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  View Analysis
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}