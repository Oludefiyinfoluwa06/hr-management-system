'use client';

import { useState } from 'react';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { MapPin, Clock, Plus, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EmployerJobsPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('active');

    const router = useRouter();

    return (
        <div className="bg-gray-50 min-h-screen">
            <Sidebar
                type="employer"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <Header
                username="TechCorp Inc."
                onMenuClick={() => setIsSidebarOpen(true)}
            />

            <main className="pt-16 p-4 md:p-6 md:ml-64 md:mt-[60px] mt-[30px]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-2xl font-semibold">Job Listings</h1>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        onClick={() => router.push("/employer/jobs/post")}
                    >
                        <Plus size={20} />
                        Post New Job
                    </button>
                </div>

                <div className="flex border-b mb-6">
                    {['Active', 'Paused', 'Closed'].map((tab) => (
                        <button
                            key={tab}
                            className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px ${
                                activeTab === tab.toLowerCase()
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((job) => (
                        <div key={job} className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold mb-2">Senior Frontend Developer</h2>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            <span>San Francisco, CA (Remote)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Briefcase size={16} />
                                            <span>24 applicants</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={16} />
                                            <span>5 days left</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                                        View Applications
                                    </button>
                                    <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                                        Edit
                                    </button>
                                    <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                                        Pause
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
