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

interface Applicant {
    _id: string;
    name: string;
    email: string;
    resumeUrl: string;
    status: 'pending' | 'accepted' | 'rejected';
}

interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

export default function JobApplicationsPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [jobDetails, setJobDetails] = useState<JobDetail | null>(null);
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<Record<string, any> | null>(null);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });

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

    const fetchApplicants = async (page: number = 1) => {
        try {
            const token = await getCookie('jwt_token');
            const response = await axios.get(`${config.BASE_API_URL}/job/${jobId}/applications`, {
                params: {
                    page,
                    limit: pagination.itemsPerPage
                },
                headers: {
                    'Authorization': `Bearer ${token?.value}`,
                }
            });

            setApplicants(response.data.results);
            setPagination(prev => ({
                ...prev,
                currentPage: response.data.currentPage,
                totalPages: response.data.totalPages,
                totalItems: response.data.results.length,
            }));
        } catch (err) {
            setError('Failed to fetch applicants');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobDetails();
        // fetchApplicants();
    }, [jobId]);

    const handleApplicationAction = async (applicantId: string, status: 'accepted' | 'rejected') => {
        try {
            const token = await getCookie('jwt_token');
            await axios.put(`${config.BASE_API_URL}/job/${jobId}/applications/${applicantId}`,
                { status },
                {
                    headers: {
                        'Authorization': `Bearer ${token?.value}`,
                    }
                }
            );
            fetchApplicants(pagination.currentPage);
        } catch (err) {
            setError('Failed to update application status');
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchApplicants(newPage);
        }
    };

    const handleDownloadResume = (resumeUrl: string) => {
        window.open(resumeUrl, '_blank');
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
                username={user?.companyName}
                onMenuClick={() => setIsSidebarOpen(true)}
            />

            <main className="pt-16 p-4 md:p-6 md:ml-64 md:mt-[60px] mt-[30px]">
                <button 
                    onClick={() => router.push('/employer/jobs')}
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
                    </div>
                )}

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Applicants</h2>
                    {applicants.length === 0 ? (
                        <div className="text-center text-gray-500 p-4">
                            No applications received yet.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {applicants.map((applicant) => (
                                <div
                                    key={applicant._id}
                                    className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center"
                                >
                                    <div className="flex-1 mb-4 md:mb-0">
                                        <h3 className="font-semibold text-lg">{applicant.name}</h3>
                                        <p className="text-gray-600">{applicant.email}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-3 items-center">
                                        <button
                                            onClick={() => handleDownloadResume(applicant.resumeUrl)}
                                            className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                                        >
                                            <File size={16} /> View Resume
                                        </button>
                                        {applicant.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleApplicationAction(applicant._id, 'accepted')}
                                                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                                                >
                                                    <Check size={16} /> Accept
                                                </button>
                                                <button
                                                    onClick={() => handleApplicationAction(applicant._id, 'rejected')}
                                                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                                                >
                                                    <X size={16} /> Reject
                                                </button>
                                            </>
                                        )}
                                        {applicant.status === 'accepted' && (
                                            <div className="text-green-600 font-semibold">Accepted</div>
                                        )}
                                        {applicant.status === 'rejected' && (
                                            <div className="text-red-600 font-semibold">Rejected</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

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
                </div>
            </main>
        </div>
    );
}
