'use client';

import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { StatCard } from '@/components/common/shared/StatCard';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUser } from '@/services/auth-requests';
import { getCookie } from '@/app/actions';
import axios from 'axios';
import { config } from '@/utils/config';
import Link from 'next/link';

export default function EmployerDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [applications, setApplications] = useState<Record<string, any>[]>([]);
    const [user, setUser] = useState<Record<string, any> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [jobs, setJobs] = useState<number>(0);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser();
            setUser(data.response);
        }

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = await getCookie('jwt_token');
                const response = await axios.get(`${config.BASE_API_URL}/job-applications/company`, {
                    headers: { 'Authorization': `Bearer ${token?.value}` }
                });

                setApplications(response.data);
                setIsLoading(false);
            } catch (error) {
                setError('Failed to fetch applications');
                setIsLoading(false);
            }
        };

        fetchApplications();
    }, []);

    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true);
            try {
                const token = await getCookie('jwt_token');
                const response = await axios.get(`${config.BASE_API_URL}/job/company/all`, {
                    headers: {
                        'Authorization': `Bearer ${token?.value}`,
                    }
                });

                setJobs(response.data.length);
            } catch (err) {
                setError('Failed to fetch jobs');
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

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
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6 mb-4 md:mb-6">
                    <StatCard
                        title="All Jobs"
                        value={jobs || 0}
                    />
                    <StatCard
                        title="Total Applications"
                        value={applications.length || 0}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Recent Applications</h2>
                            <Link
                                className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                                href="/employer/applications"
                            >
                                View All <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {applications.length === 0 ? (
                                <div className="text-center text-gray-500 p-4">
                                    No applications found.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-5 text-xs md:text-sm font-semibold text-gray-600 px-4 py-2 border-b">
                                        <div className="col-span-2">Job</div>
                                        <div className="col-span-1">Location</div>
                                        <div className="col-span-1">Employment Type</div>
                                        <div className="col-span-1">Cover Letter</div>
                                    </div>

                                    {applications.slice(0, 5).map((app: any) => (
                                        <div
                                            key={app._id}
                                            className="bg-white border rounded-lg p-4 grid grid-cols-5 items-center gap-2 hover:bg-gray-50 transition"
                                        >
                                            <div className="col-span-2 flex items-center gap-3">
                                                <div>
                                                    <h3 className="font-semibold text-xs md:text-sm">{app.jobId.title}</h3>
                                                </div>
                                            </div>
                                            <div className="col-span-1 flex items-center gap-3">
                                                <div>
                                                    <h3 className="text-xs md:text-sm">{app.jobId.location}</h3>
                                                </div>
                                            </div>
                                            <div className="col-span-1 flex items-center gap-3">
                                                <div>
                                                    <h3 className="text-xs md:text-sm capitalize">{app.jobId.employmentType}</h3>
                                                </div>
                                            </div>
                                            <div className="col-span-1 flex items-center gap-3">
                                                <div>
                                                    <h3 className="text-xs md:text-sm">{app.coverLetter}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
