'use client';

import { useState } from 'react';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { Search, MapPin, Building, DollarSign, Clock } from 'lucide-react';
import Image from 'next/image';

export default function JobSeekerJobsPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');

    return (
        <div className="bg-gray-50 min-h-screen">
            <Sidebar
                type="jobseeker"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <Header
                username="John Doe"
                onMenuClick={() => setIsSidebarOpen(true)}
            />

            <main className="pt-16 p-4 md:p-6 md:ml-64 md:mt-[60px] mt-[30px]">
                <div className="mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search jobs by title, company, or keywords"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                        {['All Jobs', 'Full-time', 'Part-time', 'Contract', 'Remote'].map((filter) => (
                            <button
                                key={filter}
                                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                                    activeFilter === filter.toLowerCase()
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white border hover:bg-gray-50 text-gray-700'
                                }`}
                                onClick={() => setActiveFilter(filter.toLowerCase())}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((job) => (
                        <div key={job} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Image
                                        src="https://via.placeholder.com/48x48"
                                        alt="Company logo"
                                        width={48}
                                        height={48}
                                        className="rounded"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold mb-2">Senior Frontend Developer</h2>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Building size={16} />
                                            <span>TechCorp Inc.</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            <span>San Francisco, CA (Remote)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <DollarSign size={16} />
                                            <span>$120k - $180k</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={16} />
                                            <span>Full-time</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        We&rsquo;re looking for a Senior Frontend Developer to join our team and help build amazing user experiences...
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {['React', 'TypeScript', 'Next.js', 'Tailwind'].map((skill) => (
                                            <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Posted 2 days ago • 24 applicants</span>
                                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
