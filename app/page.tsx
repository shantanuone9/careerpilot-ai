import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold text-slate-900">
          CareerPilot AI
        </h1>

        <p className="mt-6 text-xl text-slate-600">
          AI-powered Resume Analyzer that helps improve your ATS score,
          identify missing skills, and optimize your resume for better job
          opportunities.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Login
          </Link>

          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-300 px-6 py-3 hover:bg-slate-100"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}