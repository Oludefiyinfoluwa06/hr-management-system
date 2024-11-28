"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Edit, FileText, Briefcase, MapPin, Mail, Phone } from 'lucide-react';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';

export default function JobSeekerProfile() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: 'John Doe',
        title: 'Senior Frontend Developer',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        bio: 'Experienced frontend developer with 5+ years of experience in building responsive web applications using React and Next.js.',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
        experience: [
            {
                company: 'TechCorp Inc.',
                title: 'Frontend Developer',
                duration: 'Jan 2021 - Present'
            },
            {
                company: 'WebSolutions Ltd.',
                title: 'Junior Frontend Developer',
                duration: 'Jun 2018 - Dec 2020'
            }
        ]
    });

    const handleSave = () => {
        setIsEditing(false);
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
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-base md:text-lg font-semibold">Profile</h1>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm"
                        >
                            <Edit size={16} />
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3">
                            <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
                                <Image
                                    src="https://via.placeholder.com/150"
                                    alt="Profile Picture"
                                    width={150}
                                    height={150}
                                    className="rounded-full mb-4"
                                />
                                <h2 className="font-semibold text-sm md:text-base">{profile.name}</h2>
                                <p className="text-gray-600 text-xs md:text-sm">{profile.title}</p>
                            </div>
                        </div>

                        <div className="w-full md:w-2/3">
                            <div className="space-y-4">
                                <div className="bg-white border rounded-lg p-4">
                                    <h3 className="font-semibold mb-3 text-sm md:text-base flex items-center gap-2">
                                        <FileText size={16} /> Personal Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">Email</label>
                                            <div className="flex items-center gap-2">
                                                <Mail size={16} className="text-gray-500" />
                                                <span className="text-xs md:text-sm">{profile.email}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">Phone</label>
                                            <div className="flex items-center gap-2">
                                                <Phone size={16} className="text-gray-500" />
                                                <span className="text-xs md:text-sm">{profile.phone}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">Location</label>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-gray-500" />
                                                <span className="text-xs md:text-sm">{profile.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border rounded-lg p-4">
                                    <h3 className="font-semibold mb-3 text-sm md:text-base flex items-center gap-2">
                                        <Briefcase size={16} /> Professional Summary
                                    </h3>
                                    <p className="text-gray-700 text-xs md:text-sm">{profile.bio}</p>
                                </div>

                                <div className="bg-white border rounded-lg p-4">
                                    <h3 className="font-semibold mb-3 text-sm md:text-base">Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.skills.map(skill => (
                                            <span
                                                key={skill}
                                                className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white border rounded-lg p-4">
                                    <h3 className="font-semibold mb-3 text-sm md:text-base">Work Experience</h3>
                                    {profile.experience.map((job, index) => (
                                        <div 
                                            key={index} 
                                            className={`mb-3 pb-3 ${index < profile.experience.length - 1 ? 'border-b' : ''}`}
                                        >
                                            <h4 className="font-medium text-xs md:text-sm">{job.title}</h4>
                                            <p className="text-gray-600 text-xs md:text-sm">{job.company}</p>
                                            <p className="text-xs text-gray-500">{job.duration}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
