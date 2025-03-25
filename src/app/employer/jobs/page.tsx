'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { MapPin, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { config } from '@/utils/config';
import { getCookie } from '@/app/actions';
import { getUser } from '@/services/auth-requests';

interface JobListing {
    _id: any;
    title: string;
    location: string;
    employmentType: string;
    salaryMin: string;
    salaryMax: string;
    description: string;
    remote: string;
}

interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

export default function EmployerJobsPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [jobs, setJobs] = useState<JobListing[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });
    const [user, setUser] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser();
            setUser(data.response);
        }

        fetchUser();
    }, []);

    const router = useRouter();

    const fetchJobs = async (page: number = 1) => {
        setIsLoading(true);
        try {
            const token = await getCookie('jwt_token');
            const response = await axios.get(`${config.BASE_API_URL}/job/company`, {
                params: {
                    page,
                    limit: pagination.itemsPerPage
                },
                headers: {
                    'Authorization': `Bearer ${token?.value}`,
                }
            });

            setJobs(response.data.results);
            setPagination(prev => ({
                ...prev,
                currentPage: response.data.currentPage,
                totalPages: response.data.totalPages,
                totalItems: response.data.results.length,
            }));
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch jobs');
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchJobs(newPage);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleJobAction = async (jobId: number, action: 'view') => {
        try {
            switch (action) {
                case 'view':
                    router.push(`/employer/jobs/${jobId}`);
                    break;
            }
        } catch (err) {
            setError('Failed to perform action');
        }
    };

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
                type="employer"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <Header
                username={user?.userName}
                onMenuClick={() => setIsSidebarOpen(true)}
            />

            <main className="pt-16 p-4 md:p-6 md:ml-64 md:mt-[60px] mt-[30px]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-2xl font-semibold">Job Listings</h1>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        onClick={() => router.push("/employer/jobs/post")}
                    >
                        <Plus size={20} />
                        Post New Job
                    </button>
                </div>

                <div className="space-y-4">
                    {jobs.length === 0 ? (
                        <div className="text-center text-gray-500 p-4">
                            No jobs found.
                        </div>
                    ) : (
                        jobs.map((job) => (
                            <div key={job._id} className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                            <div className="flex items-center gap-1">
                                                <MapPin size={16} />
                                                <span>
                                                    {job.location}
                                                    {job.remote && ' (Remote)'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => handleJobAction(job._id, 'view')}
                                            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                                        >
                                            View Applications
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination Component */}
                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-600">
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                            className={`p-2 rounded ${
                                pagination.currentPage === 1
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'hover:bg-gray-100 text-gray-600'
                            }`}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.totalPages}
                            className={`p-2 rounded ${
                                pagination.currentPage === pagination.totalPages
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'hover:bg-gray-100 text-gray-600'
                            }`}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
