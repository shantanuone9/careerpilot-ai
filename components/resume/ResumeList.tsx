"use client";

import { useState } from "react";
import Link from "next/link";
import DeleteResumeButton from "./DeleteResumeButton";

type Resume = {
  id: string;
  title: string;
  fileUrl: string;
  createdAt: Date;
  atsScore: number | null;
};

type Props = {
  resumes: Resume[];
};

export default function ResumeList({
  resumes,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredResumes = resumes.filter((resume) =>
    resume.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      {/* Search */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="🔍 Search resumes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Resume List */}

      {filteredResumes.length === 0 ? (

        <div className="text-center py-10 text-gray-500">

          No resumes found.

        </div>

      ) : (

        <div className="space-y-5">

          {filteredResumes.map((resume) => (

            <div
              key={resume.id}
              className="border border-slate-200 rounded-xl p-5 bg-white hover:shadow-md transition"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                {/* Left */}

                <div className="flex gap-4 items-start">

                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">

                    <span className="font-semibold text-blue-600">
                      PDF
                    </span>

                  </div>

                  <div>

                    <h3 className="font-semibold text-lg">
                      {resume.title}
                    </h3>

                    <div className="text-sm text-gray-500 mt-1 space-y-1">

                      <p>
                        Uploaded on{" "}
                        {new Date(
                          resume.createdAt
                        ).toLocaleDateString()}
                      </p>

                      <p>
                        File Type: PDF
                      </p>

                    </div>

                  </div>

                </div>

                {/* Right */}

                <div className="flex flex-col md:flex-row items-start md:items-center gap-5">

                  <div>

                    <p className="text-sm text-gray-500">
                      ATS Score
                    </p>

                    <span
                      className={`inline-block mt-2 px-4 py-2 rounded-lg text-white font-semibold ${
                        resume.atsScore !== null
                          ? resume.atsScore >= 80
                            ? "bg-green-500"
                            : resume.atsScore >= 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {resume.atsScore !== null
                        ? `${resume.atsScore}%`
                        : "Pending"}
                    </span>

                  </div>

                  <div className="flex flex-wrap gap-3">

                    <Link
                      href={`/dashboard/resume/${resume.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                    >
                      View Analysis
                    </Link>

                    <a
                      href={resume.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                    >
                      Download
                    </a>

                    <DeleteResumeButton
                      resumeId={resume.id}
                    />

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </>
  );
}