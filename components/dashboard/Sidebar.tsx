"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white min-h-screen p-6">

      <h2 className="text-2xl font-bold mb-10">
        CareerPilot AI
      </h2>

      <nav className="space-y-5">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <br />

        <Link href="/resume">
          Resume
        </Link>

        <br />

        <Link href="/jobs">
          Jobs
        </Link>

        <br />

        <Link href="/profile">
          Profile
        </Link>

      </nav>

    </aside>
  );
}