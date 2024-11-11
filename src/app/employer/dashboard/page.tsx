'use client';

import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { StatCard } from '@/components/common/shared/StatCard';
import { ArrowRight, Users, Clock, Calendar, BarChart, Download } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function EmployerDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
                    <button className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
                        <Users size={20} />
                        Post New Job
                    </button>
                    <button className="px-3 md:px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                        <Download size={20} />
                        Download Reports
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
                    <StatCard
                        title="Active Jobs"
                        value="8"
                        trend={{ value: 2, isPositive: true }}
                    />
                    <StatCard
                        title="Total Applications"
                        value="156"
                        trend={{ value: 23, isPositive: true }}
                    />
                    <StatCard
                        title="Interviews Scheduled"
                        value="12"
                    />
                    <StatCard
                        title="Positions Filled"
                        value="3"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Recent Applications</h2>
                            <button className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                                View All <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-4 border rounded-lg hover:border-blue-200">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Image
                                            src="https://via.placeholder.com/48x48"
                                            alt="Applicant avatar"
                                            width={48}
                                            height={48}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">John Smith</h3>
                                        <p className="text-sm text-gray-600">Applied for Senior Frontend Developer</p>
                                        <div className="flex gap-2 mt-1">
                                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">React</span>
                                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">TypeScript</span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        2 hours ago
                                    </div>
                                    <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                                        Review
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-4">Active Job Posts</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-4 border rounded-lg hover:border-blue-200">
                                    <h3 className="font-semibold">Senior Frontend Developer</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Users size={16} />
                                            <span>24 applicants</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={16} />
                                            <span>5 days left</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="flex-1 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                                            View Applications
                                        </button>
                                        <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Today&rsquo;s Interview Schedule</h2>
                            <button className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                                View Calendar <Calendar size={16} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-4 border rounded-lg hover:border-blue-200">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                                        <span className="text-sm font-semibold text-blue-600">10:00</span>
                                        <span className="text-xs text-blue-600">AM</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold">Technical Interview</h3>
                                            <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">Confirmed</span>
                                        </div>
                                        <p className="text-sm text-gray-600">John Smith - Senior Frontend Developer</p>
                                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                                            <Clock size={16} />
                                            <span>45 minutes</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                            Join Call
                                        </button>
                                        <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                                            Reschedule
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Application Analytics</h2>
                            <BarChart size={20} className="text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Frontend Developer</span>
                                    <span className="font-semibold">64%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '64%' }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">UX Designer</span>
                                    <span className="font-semibold">48%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '48%' }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Product Manager</span>
                                    <span className="font-semibold">32%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32%' }} />
                                </div>
                            </div>
                            <div className="pt-4 mt-4 border-t">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">85%</div>
                                        <div className="text-sm text-gray-600">Application Rate</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">92%</div>
                                        <div className="text-sm text-gray-600">Profile Match</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
