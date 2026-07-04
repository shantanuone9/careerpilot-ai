"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";

export default function ResumeUploader() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function uploadResume(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.error || "Upload failed.");
        setLoading(false);
        return;
      }

      alert("Resume uploaded successfully!");

      router.refresh();

      if (data.resumeId) {
        router.push(`/dashboard/resume/${data.resumeId}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while uploading.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

      <div className="flex items-center gap-4 mb-6">

        <div className="bg-blue-100 p-3 rounded-xl">
          <UploadCloud className="text-blue-600" size={28} />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Upload Resume
          </h2>

          <p className="text-gray-500">
            Upload a PDF resume and receive an AI-powered ATS analysis.
          </p>

        </div>

      </div>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={uploadResume}
        disabled={loading}
        className="block w-full border border-slate-300 rounded-xl px-4 py-3
        file:mr-4 file:px-4 file:py-2 file:border-0
        file:bg-blue-600 file:text-white file:rounded-lg
        file:cursor-pointer hover:file:bg-blue-700
        disabled:opacity-50 disabled:cursor-not-allowed"
      />

      {loading && (
        <div className="mt-6 flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-xl p-4">

          <div className="w-7 h-7 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

          <div>

            <p className="font-semibold text-blue-700">
              AI is analyzing your resume...
            </p>

            <p className="text-sm text-blue-600 mt-1">
              Extracting text, uploading the file, and generating your ATS score.
              This usually takes a few seconds.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}