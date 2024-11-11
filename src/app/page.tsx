import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <nav className="flex items-center justify-between px-4 py-2">
        <p className="text-xl font-bold text-blue-600">KHR</p>
        <ul className="flex items-center justify-end gap-3">
          <li>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/register" className="text-gray-600 hover:text-blue-600 transition-colors">
              Register
            </Link>
          </li>
        </ul>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12 lg:py-20">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Where Great Companies &
            <span className="text-blue-600 block mt-2">Talent Connect</span>
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Whether you&rsquo;re hiring or looking for your next opportunity,
            KHR helps you make the right connections.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <Image
                  src="/employer-icon.png"
                  alt="For Employers"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">For Employers</h2>
              <p className="text-gray-600 mb-6">
                Find and hire top talent for your company. Post jobs, review applications,
                and build your dream team.
              </p>
              <div className="space-y-3">
                <Link
                  href="/employer/jobs/post"
                  className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Post a Job
                </Link>
                <Link
                  href="/login"
                  className="block w-full px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Sign In as Employer
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <Image
                  src="/jobseeker-icon.png"
                  alt="For Job Seekers"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">For Job Seekers</h2>
              <p className="text-gray-600 mb-6">
                Discover your next career move. Browse open positions, create your profile,
                and apply with ease.
              </p>
              <div className="space-y-3">
                <Link
                  href="/jobseeker/jobs"
                  className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Find Jobs
                </Link>
                <Link
                  href="/login"
                  className="block w-full px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Sign In as Job Seeker
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center py-12">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">10k+</div>
            <div className="text-gray-600">Active Jobs</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">5k+</div>
            <div className="text-gray-600">Companies</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">2M+</div>
            <div className="text-gray-600">Job Seekers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">15k+</div>
            <div className="text-gray-600">Placements</div>
          </div>
        </div>
      </div>
    </div>
  );
}
