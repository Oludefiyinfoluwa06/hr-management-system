'use client';

import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { StatCard } from '@/components/common/shared/StatCard';
import { ArrowRight, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getUser } from '@/services/auth-requests';

export default function EmployerDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser();
            setUser(data.response);
        }

        fetchUser();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Sidebar
                type="employer"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <Header
                username={user?.companyName}
                onMenuClick={() => setIsSidebarOpen(true)}
            />

            <main className="pt-16 p-4 md:p-6 md:ml-64 md:mt-[60px] mt-[30px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
                    <StatCard
                        title="Active Jobs"
                        value="8"
                    />
                    <StatCard
                        title="Total Applications"
                        value="156"
                    />
                    <StatCard
                        title="Interviews Scheduled"
                        value="12"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Today&rsquo;s Interview Schedule</h2>
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
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
