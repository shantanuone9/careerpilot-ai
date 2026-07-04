import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Briefcase, Search, MapPin, Building2 } from "lucide-react";

export default async function JobsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

          <div className="flex items-center gap-4">

            <div className="bg-blue-100 p-4 rounded-2xl">
              <Briefcase
                className="text-blue-600"
                size={30}
              />
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                Job Opportunities
              </h1>

              <p className="text-gray-500 mt-2">
                Discover opportunities that match your resume and skills.
              </p>

            </div>

          </div>

        </div>

        {/* Coming Soon */}

        <div className="mt-8 bg-white rounded-3xl shadow-sm border border-slate-200 p-10 text-center">

          <Search
            size={60}
            className="mx-auto text-blue-600 mb-6"
          />

          <h2 className="text-3xl font-bold">
            Job Recommendation Portal
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-8">
            This section will recommend jobs based on your uploaded
            resume, ATS score, technical skills, and career interests.
          </p>

        </div>

        {/* Feature Cards */}

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            <Building2
              className="text-blue-600 mb-4"
              size={28}
            />

            <h3 className="font-semibold text-lg">
              Company Listings
            </h3>

            <p className="text-gray-500 mt-2">
              Browse companies hiring for software engineering roles.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            <Search
              className="text-green-600 mb-4"
              size={28}
            />

            <h3 className="font-semibold text-lg">
              Smart Matching
            </h3>

            <p className="text-gray-500 mt-2">
              AI-based recommendations tailored to your resume.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            <MapPin
              className="text-orange-600 mb-4"
              size={28}
            />

            <h3 className="font-semibold text-lg">
              Location Filter
            </h3>

            <p className="text-gray-500 mt-2">
              Search jobs based on preferred cities and locations.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}