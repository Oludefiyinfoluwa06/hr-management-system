'use client';

import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { Search, Filter, ArrowRight, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export default function EmployeeApplications() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Pending', 'Approved', 'Rejected'];

    const applications = [
        {
            id: 1,
            type: 'Leave Request',
            status: 'Pending',
            date: 'September 15, 2024',
            duration: '3 days',
            icon: <Clock size={24} className="text-yellow-600" />
        },
        {
            id: 2,
            type: 'Training Program',
            status: 'Approved',
            date: 'August 20, 2024',
            duration: 'Advanced React Course',
            icon: <CheckCircle size={24} className="text-green-600" />
        },
        {
            id: 3,
            type: 'Equipment Request',
            status: 'Rejected',
            date: 'July 10, 2024',
            duration: 'New Laptop',
            icon: <AlertCircle size={24} className="text-red-600" />
        }
    ];

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
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">My Applications</h1>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                            New Application <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search applications..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg pl-10"
                            />
                            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter size={20} className="text-gray-600" />
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    className={`px-3 py-2 rounded-lg text-sm ${
                                        activeFilter === filter
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}
                                    onClick={() => setActiveFilter(filter)}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {applications.map((application) => (
                            <div
                                key={application.id}
                                className="flex items-center gap-4 p-4 border rounded-lg hover:border-blue-200"
                            >
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                    {application.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">{application.type}</h3>
                                    <div className="flex gap-2 mt-1">
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            application.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                                            application.status === 'Approved' ? 'bg-green-100 text-green-600' :
                                            'bg-red-100 text-red-600'
                                        }`}>
                                            {application.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <div>{application.date}</div>
                                    <div className="text-xs text-gray-500">{application.duration}</div>
                                </div>
                                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                                    Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
