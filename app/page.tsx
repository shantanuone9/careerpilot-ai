import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100">

      {/* Navbar */}

      <nav className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Image
            src="/logo.png"
            alt="CareerPilot AI"
            width={52}
            height={52}
            className="rounded-xl"
          />

          <span className="text-3xl font-bold text-slate-900">
            CareerPilot AI
          </span>

        </div>

        <div className="flex gap-4">

          <Link
            href="/login"
            className="px-6 py-3 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Register
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <section className="max-w-6xl mx-auto px-8 py-24 text-center">

        <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
          AI Powered Resume Analyzer
        </span>

        <h1 className="mt-8 text-6xl font-extrabold leading-tight text-slate-900">

          Build Job-Winning
          <br />

          <span className="text-blue-600">
            ATS-Friendly Resumes
          </span>

        </h1>

        <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-9">

          CareerPilot AI analyzes your resume using Artificial Intelligence,
          calculates your ATS score, identifies missing skills, and provides
          personalized recommendations to help you land your dream job.

        </p>

        <div className="mt-12 flex justify-center gap-6">

          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="border border-gray-300 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold transition"
          >
            Login
          </Link>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-6xl mx-auto px-8 pb-24">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why CareerPilot AI?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow-md p-8">

            <div className="text-5xl mb-4">📄</div>

            <h3 className="text-2xl font-bold mb-3">
              Resume Analysis
            </h3>

            <p className="text-gray-600">
              Get detailed AI-powered ATS analysis with personalized feedback.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-8">

            <div className="text-5xl mb-4">🤖</div>

            <h3 className="text-2xl font-bold mb-3">
              AI Suggestions
            </h3>

            <p className="text-gray-600">
              Improve resume quality using intelligent recommendations.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-8">

            <div className="text-5xl mb-4">📊</div>

            <h3 className="text-2xl font-bold mb-3">
              ATS Score
            </h3>

            <p className="text-gray-600">
              Know how recruiters view your resume before applying.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}