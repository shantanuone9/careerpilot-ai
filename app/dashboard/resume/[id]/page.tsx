import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

import {
  ArrowLeft,
  FileText,
  Trophy,
  CheckCircle2,
  AlertTriangle,
  BadgeCheck,
  Lightbulb,
  Download,
} from "lucide-react";

type Analysis = {
  atsScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  suggestions: string[];
};

export default async function ResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  const resume = await prisma.resume.findUnique({
    where: {
      id,
    },
  });

  if (!resume) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Resume not found
        </h1>
      </main>
    );
  }

  if (!resume.analysis) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold">
          Resume has not been analyzed yet.
        </h1>

        <Link
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          Back to Dashboard
        </Link>
      </main>
    );
  }

  const analysis = resume.analysis as Analysis;

  return (
    <main className="min-h-screen bg-slate-100 py-10 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Back Button */}

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        {/* Top Section */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ATS Score */}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

            <div className="flex justify-center">

              <div className="bg-yellow-100 p-5 rounded-full">

                <Trophy
                  className="text-yellow-600"
                  size={42}
                />

              </div>

            </div>

            <p className="text-center text-gray-500 mt-6 uppercase tracking-wide">
              ATS Score
            </p>

            <h1
              className={`text-7xl font-bold text-center mt-4 ${
                analysis.atsScore >= 80
                  ? "text-green-600"
                  : analysis.atsScore >= 60
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {analysis.atsScore}%
            </h1>

            <div className="w-full bg-slate-200 rounded-full h-4 mt-8">

              <div
                className={`h-4 rounded-full ${
                  analysis.atsScore >= 80
                    ? "bg-green-500"
                    : analysis.atsScore >= 60
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${analysis.atsScore}%`,
                }}
              />

            </div>

            <div className="mt-8 border-t pt-6 text-center">

              <p className="text-sm text-gray-500">
                Resume Name
              </p>

              <h3 className="font-semibold text-lg mt-1">
                {resume.title}
              </h3>

              <div className="mt-5">

                <p className="text-sm text-gray-500">
                  Analyzed on
                </p>

                <p className="font-medium">
                  {new Date(
                    resume.updatedAt
                  ).toLocaleDateString()}
                </p>

              </div>

            </div>

          </div>

          {/* Executive Summary */}

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

            <div className="flex items-center gap-3 mb-8">

              <div className="bg-blue-100 p-3 rounded-xl">

                <FileText
                  className="text-blue-600"
                />

              </div>

              <div>

                <h2 className="text-3xl font-bold">
                  Executive Summary
                </h2>

                <p className="text-gray-500">
                  AI-generated overview of your resume
                </p>

              </div>

            </div>

            <p className="text-gray-700 leading-8 text-lg">
              {analysis.summary}
            </p>

          </div>

        </div>

        {/* Continue with Part 2 */}

        {/* Analysis Section */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* Strengths */}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

            <div className="flex items-center gap-3 mb-8">

              <CheckCircle2
                className="text-green-600"
                size={30}
              />

              <h2 className="text-2xl font-bold text-green-700">
                Strengths
              </h2>

            </div>

            <div className="space-y-4">

              {analysis.strengths.map((item, index) => (

                <div
                  key={index}
                  className="flex items-start gap-4 bg-green-50 border border-green-200 rounded-xl p-4"
                >

                  <CheckCircle2
                    className="text-green-600 flex-shrink-0 mt-1"
                    size={20}
                  />

                  <p className="text-gray-700 leading-7">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* Weaknesses */}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

            <div className="flex items-center gap-3 mb-8">

              <AlertTriangle
                className="text-orange-500"
                size={30}
              />

              <h2 className="text-2xl font-bold text-orange-600">
                Areas for Improvement
              </h2>

            </div>

            <div className="space-y-4">

              {analysis.weaknesses.map((item, index) => (

                <div
                  key={index}
                  className="flex items-start gap-4 bg-orange-50 border border-orange-200 rounded-xl p-4"
                >

                  <AlertTriangle
                    className="text-orange-500 flex-shrink-0 mt-1"
                    size={20}
                  />

                  <p className="text-gray-700 leading-7">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Missing Skills */}

        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

          <div className="flex items-center gap-3 mb-8">

            <BadgeCheck
              className="text-blue-600"
              size={30}
            />

            <h2 className="text-2xl font-bold">
              Missing Skills
            </h2>

          </div>

          <div className="flex flex-wrap gap-4">

            {analysis.missingSkills.map((skill, index) => (

              <span
                key={index}
                className="bg-blue-100 text-blue-700 border border-blue-200 px-5 py-3 rounded-full font-medium hover:bg-blue-600 hover:text-white transition"
              >
                {skill}
              </span>

            ))}

          </div>

        </div>

        {/* Continue with Part 3 */}

        {/* AI Recommendations */}

        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb
              className="text-yellow-500"
              size={30}
            />

            <h2 className="text-2xl font-bold">
              AI Recommendations
            </h2>

          </div>

          <div className="space-y-5">

            {analysis.suggestions.map((suggestion, index) => (

              <div
                key={index}
                className="flex gap-5 items-start bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition"
              >

                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">

                  {index + 1}

                </div>

                <p className="text-gray-700 leading-7">
                  {suggestion}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Resume Preview */}

        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

          <div className="flex items-center gap-3 mb-6">

            <FileText
              className="text-blue-600"
              size={28}
            />

            <h2 className="text-2xl font-bold">
              Uploaded Resume
            </h2>

          </div>

          <iframe
            src={resume.fileUrl}
            title="Resume Preview"
            className="w-full h-[700px] rounded-xl border"
          />

        </div>

        {/* Action Buttons */}

        <div className="mt-10 flex flex-wrap gap-4">

          <a
            href={resume.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition font-semibold"
          >

            <Download size={20} />

            Download Resume

          </a>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-xl transition font-semibold"
          >

            <ArrowLeft size={20} />

            Back to Dashboard

          </Link>

        </div>

      </div>

    </main>
  );
}