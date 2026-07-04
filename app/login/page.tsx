"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      alert("Invalid Email or Password");
      return;
    }

    alert("Login Successful!");

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto min-h-screen grid lg:grid-cols-2">

        {/* Left Section */}

        <div className="hidden lg:flex flex-col justify-center px-16">

          <div className="max-w-xl">

            <h1 className="text-5xl font-bold text-slate-800 leading-tight">
              CareerPilot AI
            </h1>

            <p className="text-xl text-gray-600 mt-6 leading-8">
              Upload your resume, receive AI-powered ATS analysis,
              identify missing skills, and improve your chances of
              landing your dream job.
            </p>

            <div className="space-y-6 mt-12">

              <div className="flex items-center gap-4">

                <div className="bg-blue-100 p-3 rounded-xl">
                  <FileText className="text-blue-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    AI Resume Analysis
                  </h3>

                  <p className="text-gray-500">
                    Get detailed ATS scores and feedback.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="bg-green-100 p-3 rounded-xl">
                  <ShieldCheck className="text-green-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Secure Resume Storage
                  </h3>

                  <p className="text-gray-500">
                    Store and manage resumes securely.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="bg-yellow-100 p-3 rounded-xl">
                  <Sparkles className="text-yellow-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    AI Suggestions
                  </h3>

                  <p className="text-gray-500">
                    Improve your resume with personalized recommendations.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Login Card */}

        <div className="flex items-center justify-center p-8">

          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

            <div className="text-center mb-8">

              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">

                <FileText className="text-blue-600" size={30} />

              </div>

              <h2 className="text-3xl font-bold text-slate-800">
                Welcome Back
              </h2>

              <p className="text-gray-500 mt-2">
                Sign in to continue to CareerPilot AI
              </p>

            </div>

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              <div>

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>

              <div>

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3 transition disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            <p className="text-center text-sm text-gray-500 mt-8">
              AI Powered Resume Analysis Platform
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}