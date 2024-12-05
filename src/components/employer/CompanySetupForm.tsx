import { config } from "@/utils/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { getUser } from "@/services/auth-requests";
import { getCookie } from "@/app/actions";
import { useRouter } from "next/navigation";

export const CompanySetupForm = ({ onSetupComplete }: { onSetupComplete: any }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState<Record<string, any> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        name: '',
        industry: '',
        founded: '',
        size: '',
        location: '',
        website: '',
        description: '',
        mission: ''
    });

    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser();
            setUser(data.response);
            setFormData((prevData: any) => ({
                ...prevData,
                name: data.response.companyName,
            }))
        }

        fetchUser();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = await getCookie('jwt_token');
            await axios.post(`${config.BASE_API_URL}/company`, formData, {
                headers: {
                    'Authorization': `Bearer ${token?.value}`,
                }
            });

            setSuccess("Company Profile set up successfully");

            setTimeout(() => {
                setSuccess("");
            }, 3000);

            router.push('/employer/profile');
        } catch (error: any) {
            setError(Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message);

            setTimeout(() => {
                setError("");
            }, 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
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

            <main className="bg-gray-50 min-h-screen mt-[68px] flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">Set Up Your Company Profile</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Industry</label>
                            <input
                                type="text"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Founded Year</label>
                                <input
                                    type="number"
                                    name="founded"
                                    value={formData.founded}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Company Size</label>
                                <select
                                    name="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Size</option>
                                    <option value="1-10 employees">1-10 employees</option>
                                    <option value="11-50 employees">11-50 employees</option>
                                    <option value="51-200 employees">51-200 employees</option>
                                    <option value="201-500 employees">201-500 employees</option>
                                    <option value="501-1000 employees">501-1000 employees</option>
                                    <option value="1000+ employees">1000+ employees</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Website</label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mission Statement</label>
                            <textarea
                                name="mission"
                                value={formData.mission}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Create Company Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};
