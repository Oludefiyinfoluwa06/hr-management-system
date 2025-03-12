'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { File, Check, X, ChevronLeft, ChevronRight, MapPin, Briefcase } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { config } from '@/utils/config';
import { getCookie } from '@/app/actions';
import { getUser } from '@/services/auth-requests';

interface JobDetail {
    _id: string;
    title: string;
    location: string;
    employmentType: string;
    salaryMin: string;
    salaryMax: string;
    description: string;
    remote: boolean;
}

export default function JobApplicationsPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [jobDetails, setJobDetails] = useState<JobDetail | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<Record<string, any> | null>(null);

    const router = useRouter();
    const params = useParams();
    const jobId = params.id as string;

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser();
            setUser(data.response);
        }
        fetchUser();
    }, []);

    const fetchJobDetails = async () => {
        setIsLoading(true);
        try {
            const token = await getCookie('jwt_token');
            const response = await axios.get(`${config.BASE_API_URL}/job/${jobId}`, {
                headers: {
                    'Authorization': `Bearer ${token?.value}`,
                }
            });

            setJobDetails(response.data);
        } catch (err) {
            setError('Failed to fetch job details');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobDetails();
    }, [jobId]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-800 border-b-transparent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Sidebar
                type="jobseeker"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <Header
                username={user?.userName}
                onMenuClick={() => setIsSidebarOpen(true)}
            />

            <main className="pt-16 p-4 md:p-6 md:ml-64 md:mt-[60px] mt-[30px]">
                <button
                    onClick={() => router.push('/jobseeker/jobs')}
                    className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
                >
                    <ChevronLeft size={20} />
                    Back to Job Listings
                </button>

                {jobDetails && (
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                        <h1 className="text-2xl font-semibold mb-4">{jobDetails.title}</h1>
                        <div className="grid md:grid-cols-3 gap-4 text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                                <MapPin size={20} />
                                <span>{jobDetails.location} {jobDetails.remote && '(Remote)'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Briefcase size={20} />
                                <span>{jobDetails.employmentType}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>${jobDetails.salaryMin} - ${jobDetails.salaryMax}</span>
                            </div>
                        </div>
                        <p className="text-gray-700">{jobDetails.description}</p>

                        <button
                            onClick={() => router.push(`/jobseeker/jobs/${jobId}/apply`)}
                            className="mt-4 px-3 py-2 flex items-center text-white bg-blue-600"
                        >
                            Apply
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
