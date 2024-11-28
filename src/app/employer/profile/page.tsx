"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import {
    Edit,
    Building2,
    MapPin,
    Globe,
    Users,
    Briefcase
} from 'lucide-react';

export default function CompanyProfile() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [companyProfile, setCompanyProfile] = useState({
        name: 'TechCorp Solutions',
        industry: 'Software Development',
        founded: 2010,
        size: '51-200 employees',
        location: 'San Francisco, CA',
        website: 'www.techcorpsolutions.com',
        description: 'A innovative technology company focusing on cutting-edge software solutions and digital transformation.',
        mission: 'To empower businesses through transformative technology and exceptional user experiences.',
    });

    return (
        <div className="bg-gray-50 min-h-screen">
            <Sidebar
                type="employer"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <Header
                username="Company Admin"
                onMenuClick={() => setIsSidebarOpen(true)}
            />

            <main className="pt-16 p-4 md:p-6 md:ml-64 md:mt-[60px] mt-[30px]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-base md:text-lg font-semibold flex items-center gap-2">
                            <Building2 size={20} /> Company Profile
                        </h1>
                        <button className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm">
                            <Edit size={16} /> Edit Profile
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row items-center gap-6">
                            <Image
                                src="https://via.placeholder.com/150"
                                alt="Company Logo"
                                width={150}
                                height={150}
                                className="rounded-lg"
                            />
                            <div>
                                <h2 className="text-lg md:text-xl font-bold">{companyProfile.name}</h2>
                                <p className="text-gray-600 text-sm">{companyProfile.industry}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg shadow-sm p-4">
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                    <Briefcase size={16} /> Company Details
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Globe size={16} className="text-gray-500" />
                                        <span>Founded: {companyProfile.founded}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users size={16} className="text-gray-500" />
                                        <span>Company Size: {companyProfile.size}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-gray-500" />
                                        <span>Location: {companyProfile.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe size={16} className="text-gray-500" />
                                        <span>Website: {companyProfile.website}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-4">
                                <h3 className="font-semibold mb-3">Company Description</h3>
                                <p className="text-sm text-gray-700 mb-4">{companyProfile.description}</p>

                                <h3 className="font-semibold mb-3">Mission Statement</h3>
                                <p className="text-sm text-gray-700">{companyProfile.mission}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
