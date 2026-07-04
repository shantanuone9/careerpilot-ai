import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  User,
  Mail,
  ShieldCheck,
  FileText,
} from "lucide-react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">

              <User
                size={40}
                className="text-blue-600"
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold">
                My Profile
              </h1>

              <p className="text-gray-500 mt-2">
                View your account information and activity.
              </p>

            </div>

          </div>

        </div>

        {/* Profile Information */}

        <div className="mt-8 bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

          <h2 className="text-2xl font-semibold mb-8">
            Account Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="border rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-3">

                <User className="text-blue-600" />

                <h3 className="font-semibold">
                  Full Name
                </h3>

              </div>

              <p className="text-gray-700">
                {session.user?.name}
              </p>

            </div>

            <div className="border rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-3">

                <Mail className="text-green-600" />

                <h3 className="font-semibold">
                  Email Address
                </h3>

              </div>

              <p className="text-gray-700">
                {session.user?.email}
              </p>

            </div>

            <div className="border rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-3">

                <ShieldCheck className="text-purple-600" />

                <h3 className="font-semibold">
                  Account Status
                </h3>

              </div>

              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Active
              </span>

            </div>

            <div className="border rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-3">

                <FileText className="text-orange-600" />

                <h3 className="font-semibold">
                  Resume Analysis
                </h3>

              </div>

              <p className="text-gray-700">
                AI Resume Analyzer Enabled
              </p>

            </div>

          </div>

        </div>

        {/* About CareerPilot */}

        <div className="mt-8 bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

          <h2 className="text-2xl font-semibold mb-4">
            About CareerPilot AI
          </h2>

          <p className="text-gray-600 leading-8">
            CareerPilot AI helps users improve their resumes through
            AI-powered ATS analysis, identify missing skills,
            receive personalized suggestions, and prepare
            professional resumes for job applications.
          </p>

        </div>

      </div>

    </main>
  );
}