'use client';

import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { StatCard } from '@/components/common/shared/StatCard';
import { useState, useEffect } from 'react';
import { getUser } from '@/services/auth-requests';
import { getCookie } from '@/app/actions';
import axios from 'axios';
import { config } from '@/utils/config';

export default function JobSeekerDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [applications, setApplications] = useState<Record<string, any>[]>([]);
    const [user, setUser] = useState<Record<string, any> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                const response = await axios.get(`${config.BASE_API_URL}/job-applications`, {
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
                <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4 md:mb-6">
                    <StatCard
                        title="Applications Sent"
                        value={applications.length || 0}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4 md:p-6">
                        <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Recent Applications</h2>
                        <div className="space-y-3 md:space-y-4">
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
