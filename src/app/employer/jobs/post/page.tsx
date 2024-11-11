"use client";

import { FormEvent, useState } from 'react';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { MapPin, Building, DollarSign, Clock } from 'lucide-react';

export function PostJobPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        employmentType: 'Full-time',
        salaryMin: '',
        salaryMax: '',
        skills: '',
        description: '',
        requirements: '',
        benefits: '',
        remote: false,
        deadline: '',
        experienceLevel: 'Mid-Level',
    });
    const [previewMode, setPreviewMode] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you would typically submit the form data to your backend
        console.log('Form submitted:', formData);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

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
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Post a New Job</h1>
                        <button
                            onClick={() => setPreviewMode(!previewMode)}
                            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                        >
                            {previewMode ? 'Edit Job' : 'Preview'}
                        </button>
                    </div>

                    {showSuccess && (
                        <div className="mb-6 bg-blue-50 text-blue-800 border border-blue-200 p-4 rounded">
                            <p className="font-semibold">
                                Success!
                            </p>
                            <span>
                                Your job posting was created successfully.
                            </span>
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {previewMode ? (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold">{formData.title || 'Job Title'}</h2>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Building size={16} />
                                        <span>TechCorp Inc.</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        <span>{formData.location || 'Location'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <DollarSign size={16} />
                                        <span>${formData.salaryMin} - ${formData.salaryMax}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={16} />
                                        <span>{formData.employmentType}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <section>
                                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                                        <p className="text-gray-600 whitespace-pre-line">{formData.description}</p>
                                    </section>
                                    <section>
                                        <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                                        <p className="text-gray-600 whitespace-pre-line">{formData.requirements}</p>
                                    </section>
                                    <section>
                                        <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                                        <p className="text-gray-600 whitespace-pre-line">{formData.benefits}</p>
                                    </section>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.skills.split(',').map((skill: string, index: number) => (
                                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Job Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g. Senior Frontend Developer"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Location *
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g. San Francisco, CA"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Employment Type *
                                        </label>
                                        <select
                                            name="employmentType"
                                            value={formData.employmentType}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                            <option>Full-time</option>
                                            <option>Part-time</option>
                                            <option>Contract</option>
                                            <option>Internship</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Salary Range (Min) *
                                        </label>
                                        <input
                                            type="text"
                                            name="salaryMin"
                                            value={formData.salaryMin}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g. 120000"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Salary Range (Max) *
                                        </label>
                                        <input
                                            type="text"
                                            name="salaryMax"
                                            value={formData.salaryMax}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g. 180000"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Required Skills *
                                    </label>
                                    <input
                                        type="text"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g. React, TypeScript, Next.js (comma-separated)"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Job Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                                        placeholder="Describe the role, responsibilities, and expectations..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Requirements *
                                    </label>
                                    <textarea
                                        name="requirements"
                                        value={formData.requirements}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                                        placeholder="List the required qualifications, experience, and skills..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Benefits
                                    </label>
                                    <textarea
                                        name="benefits"
                                        value={formData.benefits}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                                        placeholder="List the benefits and perks offered..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Experience Level
                                        </label>
                                        <select
                                            name="experienceLevel"
                                            value={formData.experienceLevel}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option>Entry Level</option>
                                            <option>Mid-Level</option>
                                            <option>Senior</option>
                                            <option>Lead</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Application Deadline
                                        </label>
                                        <input
                                            type="date"
                                            name="deadline"
                                            value={formData.deadline}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="remote"
                                        checked={formData.remote}
                                        onChange={handleInputChange}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label className="text-sm text-gray-700">
                                        This is a remote position
                                    </label>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        Save as Draft
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Post Job
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PostJobPage;
