"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResumeUploader() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function uploadResume(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0];

  if (!file) return;

  setLoading(true);

  const formData = new FormData();

  formData.append("resume", file);

  const res = await fetch("/api/resume/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  console.log(data);

  setLoading(false);

  if (data.success) {
    alert("Resume Uploaded Successfully!");

    router.push(`/dashboard/resume/${data.resume.id}`);
  } else {
    alert(data.error);
  }
}

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        Upload Resume
      </h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={uploadResume}
      />

      {loading && (
        <p className="mt-3">
          Uploading...
        </p>
      )}

    </div>
  );
}