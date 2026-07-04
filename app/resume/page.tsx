import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FileText } from "lucide-react";

export default async function ResumePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

          <div className="flex items-center gap-4">

            <div className="bg-blue-100 p-4 rounded-2xl">
              <FileText
                className="text-blue-600"
                size={30}
              />
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                Resume Management
              </h1>

              <p className="text-gray-500 mt-2">
                Manage, upload and analyze your resumes using AI.
              </p>

            </div>

          </div>

        </div>

        <div className="mt-8 bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

          <h2 className="text-2xl font-semibold mb-4">
            Resume Center
          </h2>

          <p className="text-gray-600 leading-8">
            Upload your resumes from the Dashboard to receive
            AI-powered ATS analysis, identify missing skills,
            improve formatting, and track your resume history.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-slate-50 p-6 border">
              <h3 className="font-semibold">
                Upload Resume
              </h3>

              <p className="text-gray-500 mt-2 text-sm">
                Upload PDF or DOCX resumes.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6 border">
              <h3 className="font-semibold">
                ATS Analysis
              </h3>

              <p className="text-gray-500 mt-2 text-sm">
                Receive an AI-generated ATS compatibility score.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6 border">
              <h3 className="font-semibold">
                Resume Library
              </h3>

              <p className="text-gray-500 mt-2 text-sm">
                View, download and manage uploaded resumes.
              </p>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}