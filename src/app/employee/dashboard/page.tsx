'use client';

import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { StatCard } from '@/components/common/shared/StatCard';
import { ArrowRight, Clock, Target } from 'lucide-react';
import { useState } from 'react';

export default function EmployeeDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Sidebar
                type="employee"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <Header
                username="John Smith"
                onMenuClick={() => setIsSidebarOpen(true)}
            />

            <main className="pt-16 p-4 md:p-6 md:ml-64 md:mt-[60px] mt-[30px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
                    <StatCard
                        title="Current Project"
                        value="2"
                        trend={{ value: 1, isPositive: true }}
                    />
                    <StatCard
                        title="Performance Score"
                        value="92%"
                        trend={{ value: 3, isPositive: true }}
                    />
                    <StatCard
                        title="Upcoming Tasks"
                        value="8"
                    />
                    <StatCard
                        title="Training Courses"
                        value="3"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Active Projects</h2>
                            <button className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                                View All <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-4 border rounded-lg hover:border-blue-200">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Target size={24} className="text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">Customer Portal Redesign</h3>
                                        <div className="flex gap-2 mt-1">
                                            <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">In Progress</span>
                                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">Frontend</span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600 flex items-center gap-2">
                                        <Clock size={16} />
                                        <span>2 weeks remaining</span>
                                    </div>
                                    <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                                        Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Upcoming Meetings</h2>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-4 border rounded-lg hover:border-blue-200">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                                        <span className="text-sm font-semibold text-blue-600">14:00</span>
                                        <span className="text-xs text-blue-600">PM</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold">Sprint Planning Meeting</h3>
                                            <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">Upcoming</span>
                                        </div>
                                        <p className="text-sm text-gray-600">Customer Portal Redesign Team</p>
                                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                                            <Clock size={16} />
                                            <span>1 hour</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                            Join Meeting
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
