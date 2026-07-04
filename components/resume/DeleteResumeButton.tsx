"use client";

import { toast } from "sonner";

type Props = {
  resumeId: string;
};

export default function DeleteResumeButton({
  resumeId,
}: Props) {
  async function deleteResume() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    const loading = toast.loading("Deleting resume...");

    try {
      const res = await fetch(
        `/api/resume/delete/${resumeId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      toast.dismiss(loading);

      if (data.success) {
        toast.success("Resume deleted successfully!");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.dismiss(loading);

      toast.error("Something went wrong.");

      console.error(error);
    }
  }

  return (
    <button
      onClick={deleteResume}
      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
    >
      Delete
    </button>
  );
}