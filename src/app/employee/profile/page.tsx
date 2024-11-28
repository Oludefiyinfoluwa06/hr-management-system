'use client';

import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { Mail, Phone, MapPin, Briefcase, Calendar, Edit } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function EmployeeProfile() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'John Smith',
        email: 'john.smith@techcorp.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        jobTitle: 'Senior Frontend Developer',
        joinDate: 'January 15, 2022',
    });

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
                <div className="grid grid-cols-1 gap-6">
                    <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6">
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 mb-4 relative">
                                <Image
                                    src="https://via.placeholder.com/150"
                                    alt="Profile Picture"
                                    width={150}
                                    height={150}
                                    className="rounded-full object-cover"
                                />
                                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full">
                                    <Edit size={16} />
                                </button>
                            </div>
                            <h2 className="text-xl font-bold">{profileData.name}</h2>
                            <p className="text-gray-600">{profileData.jobTitle}</p>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail size={20} className="text-gray-500" />
                                <span>{profileData.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={20} className="text-gray-500" />
                                <span>{profileData.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin size={20} className="text-gray-500" />
                                <span>{profileData.location}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Briefcase size={20} className="text-gray-500" />
                                <span>{profileData.jobTitle}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar size={20} className="text-gray-500" />
                                <span>Joined {profileData.joinDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
