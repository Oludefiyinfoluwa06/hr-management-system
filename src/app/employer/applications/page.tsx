"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { getUser } from '@/services/auth-requests';
import { getCookie } from '@/app/actions';
import axios from 'axios';
import { config } from '@/utils/config';

export default function Applications() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [applications, setApplications] = useState<Record<string, any>[]>([]);
    const [user, setUser] = useState<Record<string, any> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const userData = await getUser();
                setUser(userData.response);

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
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-base md:text-lg font-semibold mb-4">Applications</h1>

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

                            {applications.map((app: any) => (
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
            </main>
        </div>
    );
}
