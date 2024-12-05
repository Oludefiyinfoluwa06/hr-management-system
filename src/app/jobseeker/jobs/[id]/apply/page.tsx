'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { MapPin, Upload } from 'lucide-react';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { config } from '@/utils/config';
import { cloudinaryConfigForDoc } from '@/utils/config';
import { getCookie } from '@/app/actions';
import { getUser } from '@/services/auth-requests';

export default function JobApplicationPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState<Record<string, any> | null>(null);
    const [jobDetails, setJobDetails] = useState<Record<string, any> | null>(null);
    const [resume, setResume] = useState<File | null>(null);
    const [resumePreview, setResumePreview] = useState<string | null>(null);
    const [coverLetter, setCoverLetter] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const params = useParams();
    const jobId = params.id;

    useEffect(() => {
        const fetchUserAndJobDetails = async () => {
            try {
                const userData = await getUser();
                setUser(userData.response);

                const token = await getCookie('jwt_token');
                const jobResponse = await axios.get(`${config.BASE_API_URL}/job/${jobId}`, {
                    headers: { 'Authorization': `Bearer ${token?.value}` }
                });
                setJobDetails(jobResponse.data);
            } catch (err) {
                setError('Failed to load job details');
            }
        };

        fetchUserAndJobDetails();
    }, [jobId]);

    const handleResumeUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const maxSize = 5 * 1024 * 1024;

            if (file.size > maxSize) {
                setError("File is too large. Maximum size is 5MB.");
                return;
            }

            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', cloudinaryConfigForDoc.UPLOAD_PRESET);

                const response = await axios.post(cloudinaryConfigForDoc.API_BASE_URL, formData);
                const uploadedResumeUrl = response.data.secure_url;

                setResumePreview(uploadedResumeUrl);
                setResume(file);
            } catch (error: any) {
                setError(error.response.data.error.message || "Failed to upload the resume to Cloudinary.");
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        }
    };

    const handleSubmitApplication = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const token = await getCookie('jwt_token');

            const applicationData = {
                jobId,
                companyId: jobDetails?.companyId,
                coverLetter,
                resumeLink: resumePreview,
            };

            await axios.post(`${config.BASE_API_URL}/job-applications`, applicationData, {
                headers: {
                    'Authorization': `Bearer ${token?.value}`,
                    'Content-Type': 'application/json'
                }
            });

            router.push('/jobseeker/applications');
        } catch (err) {
            setError('Failed to submit application');
            setIsLoading(false);
        }
    };

    if (!jobDetails) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-800 border-b-transparent"></div>
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
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Apply for {jobDetails.title}</h1>

                    <div className="flex items-center text-gray-600 mb-6 gap-2">
                        <MapPin size={16} />
                        <span>{jobDetails.location}</span>
                        <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">
                            {jobDetails.employmentType}
                        </span>
                    </div>

                    <form onSubmit={handleSubmitApplication} className="space-y-6">
                        <div>
                            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                                Resume/CV
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="file"
                                    id="resume"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleResumeUpload}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="resume"
                                    className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-50"
                                >
                                    <Upload size={16} />
                                    {resume ? resume.name : 'Upload Resume'}
                                </label>
                                {resumePreview && (
                                    <a
                                        href={resumePreview}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-4 text-blue-600 hover:underline"
                                    >
                                        View Resume
                                    </a>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                                Cover Letter
                            </label>
                            <textarea
                                id="coverLetter"
                                rows={4}
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2"
                                placeholder="Why are you interested in this position?"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading || !resumePreview}
                                className={`px-6 py-2 rounded-lg text-white ${
                                    isLoading || !resumePreview
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {isLoading ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>

                        {error && (
                            <div className="text-red-500 text-center mt-4">
                                {error}
                            </div>
                        )}
                    </form>
                </div>
            </main>
        </div>
    );
}
