'use client';

import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { StatCard } from '@/components/common/shared/StatCard';
import { Calendar, Clock, Eye } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function JobSeekerDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
                    <StatCard
                        title="Applications Sent"
                        value="12"
                        trend={{ value: 8, isPositive: true }}
                    />
                    <StatCard
                        title="Profile Views"
                        value="48"
                        trend={{ value: 12, isPositive: true }}
                    />
                    <StatCard
                        title="Interviews Scheduled"
                        value="3"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4 md:p-6">
                        <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Recent Applications</h2>
                        <div className="space-y-3 md:space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 p-3 md:p-4 border rounded-lg">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Image
                                            src="https://via.placeholder.com/48x48"
                                            alt="Company logo"
                                            width={48}
                                            height={48}
                                            className="rounded"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">Senior Frontend Developer</h3>
                                        <p className="text-xs md:text-sm text-gray-600">TechCorp Inc.</p>
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-600">
                                        Applied 2d ago
                                    </div>
                                    <div className="px-2 md:px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs md:text-sm">
                                        In Review
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                        <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Upcoming Interviews</h2>
                        <div className="space-y-3 md:space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="p-3 md:p-4 border rounded-lg">
                                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mb-2">
                                        <Calendar size={16} />
                                        <span>Tomorrow, 10:00 AM</span>
                                    </div>
                                    <h3 className="font-semibold">Technical Interview</h3>
                                    <p className="text-xs md:text-sm text-gray-600 mb-2">TechCorp Inc.</p>
                                    <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm">
                                        <div className="flex items-center gap-1 text-gray-600">
                                            <Clock size={16} />
                                            <span>45 min</span>
                                        </div>
                                        <button className="text-blue-600 hover:underline">
                                            Join Call
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4 md:mt-6 bg-white rounded-lg shadow-sm p-4 md:p-6">
                    <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Recommended Jobs</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-3 md:p-4 border rounded-lg">
                                <div className="flex items-center gap-2 md:gap-3 mb-3">
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Image
                                            src="https://via.placeholder.com/48x48"
                                            alt="Company logo"
                                            width={40}
                                            height={40}
                                            className="rounded"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Frontend Developer</h3>
                                        <p className="text-xs md:text-sm text-gray-600">TechCorp Inc.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mb-3">
                                    <Eye size={16} />
                                    <span>24 applicants</span>
                                </div>
                                <button className="w-full px-3 md:px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 text-sm">
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
