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

  const latestScore =
    resumes.find((r) => r.atsScore !== null)?.atsScore ?? "--";

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Welcome, {session.user?.name} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          AI Powered Resume Analyzer
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <DashboardCard
          title="Latest ATS Score"
          value={`${latestScore}`}
        />

        <DashboardCard
          title="Resumes Uploaded"
          value={resumes.length.toString()}
        />

        <DashboardCard
          title="AI Analysis"
          value="Completed"
        />

        <DashboardCard
          title="Status"
          value="Active"
        />

      </div>

      <div className="mt-10">
        <ResumeUploader />
      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          My Resumes
        </h2>

        {resumes.length === 0 ? (
          <p>No resumes uploaded yet.</p>
        ) : (
          <div className="space-y-4">

            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="flex items-center justify-between border rounded-lg p-4 hover:bg-slate-50"
              >
                <div>
                  <h3 className="font-semibold">
                    {resume.title}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    ATS Score: {resume.atsScore ?? "Pending"}
                  </p>
                </div>

                <Link
                  href={`/dashboard/resume/${resume.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
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