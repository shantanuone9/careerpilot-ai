import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">
          CareerPilot AI
        </h1>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Login
          </Link>

          <Link
            href="/dashboard"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 text-center">
        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
          AI Powered Resume Analyzer
        </span>

        <h1 className="mt-8 text-6xl font-extrabold text-slate-900 leading-tight">
          Build Job-Winning
          <br />
          <span className="text-blue-600">ATS-Friendly Resumes</span>
        </h1>

        <p className="mt-8 text-xl text-slate-600 max-w-3xl mx-auto">
          CareerPilot AI analyzes your resume using Artificial Intelligence,
          calculates your ATS score, identifies missing skills, and provides
          personalized suggestions to improve your chances of getting hired.
        </p>

        <div className="mt-12 flex justify-center gap-6 flex-wrap">
          <Link
            href="/resume"
            className="px-8 py-4 rounded-xl bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Analyze Resume
          </Link>

          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-xl border border-slate-300 text-lg font-semibold hover:bg-slate-100 transition"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 pb-24">
        <h2 className="text-4xl font-bold text-center mb-14">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-2xl font-bold mb-3">
              Resume Upload
            </h3>
            <p className="text-slate-600">
              Upload PDF or DOCX resumes securely for instant AI analysis.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold mb-3">
              AI Resume Analysis
            </h3>
            <p className="text-slate-600">
              Google Gemini AI reviews your resume and provides detailed
              feedback with actionable suggestions.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-2xl font-bold mb-3">
              ATS Score
            </h3>
            <p className="text-slate-600">
              Improve your ATS compatibility with smart recommendations and
              keyword optimization.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-6xl mx-auto text-center px-8">
          <h2 className="text-4xl font-bold text-white">
            Why CareerPilot AI?
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-14">
            <div>
              <h3 className="text-5xl font-bold text-white">95%</h3>
              <p className="text-blue-100 mt-2">
                ATS Accuracy
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-white">AI</h3>
              <p className="text-blue-100 mt-2">
                Gemini Powered
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-white">24/7</h3>
              <p className="text-blue-100 mt-2">
                Resume Analysis
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-white">100%</h3>
              <p className="text-blue-100 mt-2">
                Cloud Storage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500">
        © {new Date().getFullYear()} CareerPilot AI • Final Year Engineering Project
      </footer>
    </main>
  );
}