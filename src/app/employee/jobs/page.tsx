'use client';

import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { Search, Filter, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function EmployeeJobs() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Open', 'Applied', 'Closed'];

    const jobOpenings = [
        {
            id: 1,
            title: 'Senior Frontend Developer',
            company: 'TechCorp Inc.',
            location: 'Remote',
            type: 'Full-time',
            skills: ['React', 'TypeScript', 'Next.js'],
            status: 'Open'
        },
        {
            id: 2,
            title: 'UX Designer',
            company: 'Design Solutions',
            location: 'Hybrid',
            type: 'Full-time',
            skills: ['Figma', 'UI/UX', 'Prototyping'],
            status: 'Applied'
        },
        {
            id: 3,
            title: 'Product Manager',
            company: 'Innovation Labs',
            location: 'San Francisco, CA',
            type: 'Full-time',
            skills: ['Agile', 'Product Strategy', 'Roadmapping'],
            status: 'Closed'
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
                        <h1 className="text-2xl font-bold">Job Openings</h1>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search job openings..."
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
                        {jobOpenings.map((job) => (
                            <div
                                key={job.id}
                                className="flex items-center gap-4 p-4 border rounded-lg hover:border-blue-200"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Briefcase size={24} className="text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">{job.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                        <span>{job.company}</span>
                                        <span className="text-xs">•</span>
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            <span>{job.location}</span>
                                        </div>
                                        <span className="text-xs">•</span>
                                        <span>{job.type}</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        {job.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className={`text-xs px-2 py-1 rounded-full ${
                                    job.status === 'Open' ? 'bg-green-100 text-green-600' :
                                    job.status === 'Applied' ? 'bg-blue-100 text-blue-600' :
                                    'bg-gray-100 text-gray-600'
                                }`}>
                                    {job.status}
                                </div>
                                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2">
                                    Details <ArrowRight size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
