"use client";

import { FormEvent, useEffect, useState } from 'react';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { MapPin, Building, Clock } from 'lucide-react';
import axios from 'axios';
import { getCookie } from '@/app/actions';
import { config } from '@/utils/config';
import { getUser } from '@/services/auth-requests';
import MessageBox from '@/components/auth/MessageBox';

enum EmploymentType {
  FULL_TIME = 'FULL TIME',
  PART_TIME = 'PART TIME',
  CONTRACT = 'CONTRACT',
  FREELANCE = 'FREELANCE',
  INTERNSHIP = 'INTERNSHIP',
}

interface JobPostingData {
  title: string;
  location: string;
  employmentType: EmploymentType;
  salaryMin: number;
  salaryMax: number;
  description: string;
  remote: boolean;
  companyId: string;
}

export default function PostJobPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState<JobPostingData>({
        title: '',
        location: '',
        employmentType: EmploymentType.FULL_TIME,
        salaryMin: 0,
        salaryMax: 0,
        description: '',
        remote: false,
        companyId: '',
    });
    const [previewMode, setPreviewMode] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [user, setUser] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser();
            setUser(data.response);
            setFormData((prevData: any) => ({
                ...prevData,
                companyId: data.response.companyId,
            }));
        }

        fetchUser();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checkedValue = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({
                ...prev,
                [name]: checkedValue
            }));
        } else if (name === 'salaryMin' || name === 'salaryMax') {
            setFormData(prev => ({
                ...prev,
                [name]: parseFloat(value) || 0
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const validateForm = (): boolean => {
        if (!formData.title || !formData.location ||
            formData.salaryMin <= 0 || formData.salaryMax <= 0 ||
            !formData.description) {
            setError('Please fill in all required fields correctly.');
            return false;
        }

        if (formData.salaryMin >= formData.salaryMax) {
            setError('Maximum salary must be greater than minimum salary.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const token = await getCookie('jwt_token');
            await axios.post(`${config.BASE_API_URL}/job`, formData, {
                headers: {
                    'Authorization': `Bearer ${token?.value}`
                }
            });

            setShowSuccess(true);
            setSuccess("Job posted successfully");
            setPreviewMode(true);

            setTimeout(() => {
                setShowSuccess(false);
                setSuccess("");
            }, 3000);

        } catch (error: any) {
            setError(Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message);

            setTimeout(() => {
                setError("");
            }, 3000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Sidebar
                type="employer"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <Header
                username={user?.userName}
                onMenuClick={() => setIsSidebarOpen(true)}
            />

            <MessageBox message={error} isError={true} />
            <MessageBox message={success} isError={false} />

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

                    {error && (
                        <div className="mb-6 bg-red-50 text-red-800 border border-red-200 p-4 rounded">
                            <p className="font-semibold">Error</p>
                            <span>{error}</span>
                        </div>
                    )}

                    {showSuccess && (
                        <div className="mb-6 bg-green-50 text-green-800 border border-green-200 p-4 rounded">
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
                                        <span>{user?.userName}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        <span>{formData.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>${formData.salaryMin.toLocaleString()} - ${formData.salaryMax.toLocaleString()}</span>
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
                                    {formData.remote && (
                                        <div className="text-sm text-gray-600">
                                            🏠 Remote Position
                                        </div>
                                    )}
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
                                            {Object.values(EmploymentType).map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Salary Range (Min) *
                                        </label>
                                        <input
                                            type="number"
                                            name="salaryMin"
                                            value={formData.salaryMin}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g. 120000"
                                            min="0"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Salary Range (Max) *
                                        </label>
                                        <input
                                            type="number"
                                            name="salaryMax"
                                            value={formData.salaryMax}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g. 180000"
                                            min="0"
                                            required
                                        />
                                    </div>
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
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Posting...
                                            </>
                                        ) : (
                                            'Post Job'
                                        )}
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
