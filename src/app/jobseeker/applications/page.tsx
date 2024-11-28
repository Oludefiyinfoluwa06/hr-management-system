"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';

export default function Applications() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [applications, setApplications] = useState([
        {
            id: 1,
            jobTitle: 'Senior Frontend Developer',
            company: 'TechCorp Inc.',
            logo: 'https://via.placeholder.com/48x48',
            status: 'In Review',
            appliedDate: 'May 15, 2024',
            statusColor: 'text-blue-600 bg-blue-100'
        },
        {
            id: 2,
            jobTitle: 'React Developer',
            company: 'InnovateTech Solutions',
            logo: 'https://via.placeholder.com/48x48',
            status: 'Accepted',
            appliedDate: 'May 10, 2024',
            statusColor: 'text-green-600 bg-green-100'
        },
        {
            id: 3,
            jobTitle: 'Full Stack Engineer',
            company: 'GlobalWeb Systems',
            logo: 'https://via.placeholder.com/48x48',
            status: 'Rejected',
            appliedDate: 'May 5, 2024',
            statusColor: 'text-red-600 bg-red-100'
        }
    ]);

    const statusIcons: any = {
        'In Review': <Clock size={16} />,
        'Accepted': <CheckCircle size={16} />,
        'Rejected': <XCircle size={16} />
    };

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
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-base md:text-lg font-semibold mb-4">My Applications</h1>

                    <div className="space-y-4">
                        <div className="grid grid-cols-6 text-xs md:text-sm font-semibold text-gray-600 px-4 py-2 border-b">
                            <div className="col-span-2">Job</div>
                            <div>Company</div>
                            <div>Status</div>
                            <div>Applied Date</div>
                            <div>Actions</div>
                        </div>

                        {applications.map(app => (
                            <div
                                key={app.id}
                                className="bg-white border rounded-lg p-4 grid grid-cols-6 items-center gap-2 hover:bg-gray-50 transition"
                            >
                                <div className="col-span-2 flex items-center gap-3">
                                    <Image
                                        src={app.logo}
                                        alt="Company logo"
                                        width={40}
                                        height={40}
                                        className="rounded-lg"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-xs md:text-sm">{app.jobTitle}</h3>
                                    </div>
                                </div>
                                <div className="text-xs md:text-sm">{app.company}</div>
                                <div>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${app.statusColor}`}
                                    >
                                        {statusIcons[app.status]} {app.status}
                                    </span>
                                </div>
                                <div className="text-xs md:text-sm">{app.appliedDate}</div>
                                <div>
                                    <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg">
                                        <Eye size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
