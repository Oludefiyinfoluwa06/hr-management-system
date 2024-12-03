"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import {
    Edit,
    Building2,
    MapPin,
    Globe,
    Users,
    Briefcase,
    Save,
    X,
    Upload
} from 'lucide-react';
import { CompanySetupForm } from '@/components/employer/CompanySetupForm';
import { cloudinaryConfig, config } from '@/utils/config';
import { getUser } from '@/services/auth-requests';
import { getCookie } from '@/app/actions';
import axios from 'axios';
import MessageBox from '@/components/auth/MessageBox';

export default function CompanyProfile() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [companyProfile, setCompanyProfile] = useState<Record<string, any> | null>(null);
    const [editProfile, setEditProfile] = useState<Record<string, any> | null>(null);
    const [user, setUser] = useState<Record<string, any> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompanyProfile = async () => {
            try {
                const token = await getCookie('jwt_token');
                const response = await axios.get(`${config.BASE_API_URL}/company`, {
                    headers: {
                        'Authorization': `Bearer ${token?.value}`,
                    }
                });

                setCompanyProfile(response.data);
            } catch (error: any) {
                setError(Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message);

                setTimeout(() => {
                    setError("");
                }, 3000);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompanyProfile();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser();
            setUser(data.response);
        }

        fetchUser();
    }, []);

    const handleLogoChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            const maxSize = 5 * 1024 * 1024;

            if (!validTypes.includes(file.type)) {
                setError("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
                return;
            }

            if (file.size > maxSize) {
                setError("File is too large. Maximum size is 5MB.");
                return;
            }

            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', cloudinaryConfig.UPLOAD_PRESET);

                const response = await axios.post(cloudinaryConfig.API_BASE_URL, formData);
                const uploadedImageUrl = response.data.secure_url;

                setLogoPreview(uploadedImageUrl);
                setEditProfile((prev) => ({
                    ...prev,
                    logoUrl: uploadedImageUrl,
                }));
            } catch (error) {
                setError("Failed to upload the logo to Cloudinary.");
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        }
    };

    const handleSetupComplete = (newProfile: any) => {
        setCompanyProfile(newProfile);
    };

    const startEditing = () => {
        setEditProfile({ ...companyProfile });
        setLogoPreview(companyProfile?.logoUrl || null);
        setIsEditing(true);
    };

    const handleEditChange = (e: any) => {
        const { name, value } = e.target;
        setEditProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const cancelEditing = () => {
        setEditProfile(null);
        setLogoFile(null);
        setLogoPreview(null);
        setIsEditing(false);
    };

    const saveProfile = async () => {
        try {
            const token = await getCookie('jwt_token');
            const formData = new FormData();

            Object.keys(editProfile || {}).forEach((key) => {
                if (editProfile && editProfile[key] !== undefined) {
                    formData.append(key, editProfile[key]);
                }
            });

            const response = await axios.put(`${config.BASE_API_URL}/company`, formData, {
                headers: {
                    'Authorization': `Bearer ${token?.value}`,
                },
            });

            setCompanyProfile(response.data);
            setIsEditing(false);
            setLogoFile(null);

            setSuccessMessage("Company profile updated successfully");
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error: any) {
            setError(Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message);
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-900 border-b-transparent"></div>
            </div>
        );
    }

    if (!companyProfile) {
        return <CompanySetupForm onSetupComplete={handleSetupComplete} />;
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

            <MessageBox message={error} isError={true} />
            <MessageBox message={successMessage} isError={false} />

            <main className="pt-16 p-4 md:p-6 md:ml-64 md:mt-[60px] mt-[30px]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-base md:text-lg font-semibold flex items-center gap-2">
                            <Building2 size={20} /> Company Profile
                        </h1>
                        {!isEditing ? (
                            <button
                                onClick={startEditing}
                                className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm"
                            >
                                <Edit size={16} /> Edit Profile
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={cancelEditing}
                                    className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg text-sm"
                                >
                                    <X size={16} /> Cancel
                                </button>
                                <button
                                    onClick={saveProfile}
                                    className="flex items-center gap-2 text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg text-sm"
                                >
                                    <Save size={16} /> Save
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row items-center gap-6">
                            <div className="relative">
                                <Image
                                    src={logoPreview || companyProfile?.logoUrl || "https://via.placeholder.com/150"}
                                    alt="Company Logo"
                                    width={150}
                                    height={150}
                                    className="rounded-lg object-cover"
                                />
                                {isEditing && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                                        <label htmlFor="logo-upload" className="cursor-pointer">
                                            <Upload size={24} color="white" />
                                            <input
                                                type="file"
                                                id="logo-upload"
                                                accept=".jpg,.jpeg,.png,.gif"
                                                className="hidden"
                                                onChange={handleLogoChange}
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                            {!isEditing ? (
                                <div>
                                    <h2 className="text-lg md:text-xl font-bold">{companyProfile?.name}</h2>
                                    <p className="text-gray-600 text-sm">{companyProfile?.industry}</p>
                                </div>
                            ) : (
                                <div className="flex-grow">
                                    <input
                                        type="text"
                                        name="name"
                                        value={editProfile?.name || ''}
                                        onChange={handleEditChange}
                                        className="text-lg md:text-xl font-bold w-full border-b border-gray-300 focus:border-blue-500 outline-none mb-2"
                                    />
                                    <input
                                        type="text"
                                        name="industry"
                                        value={editProfile?.industry || ''}
                                        onChange={handleEditChange}
                                        className="text-sm text-gray-600 w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg shadow-sm p-4">
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                    <Briefcase size={16} /> Company Details
                                </h3>
                                <div className="space-y-2 text-sm">
                                    {!isEditing ? (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <Globe size={16} className="text-gray-500" />
                                                <span>Founded: {companyProfile?.founded}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users size={16} className="text-gray-500" />
                                                <span>Company Size: {companyProfile?.size}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-gray-500" />
                                                <span>Location: {companyProfile?.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Globe size={16} className="text-gray-500" />
                                                <span>Website: {companyProfile?.website}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Globe size={16} className="text-gray-500" />
                                                <input
                                                    type="number"
                                                    name="founded"
                                                    value={editProfile?.founded || ''}
                                                    onChange={handleEditChange}
                                                    className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                                                    placeholder="Founded Year"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users size={16} className="text-gray-500" />
                                                <select
                                                    name="size"
                                                    value={editProfile?.size || ''}
                                                    onChange={handleEditChange}
                                                    className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                                                >
                                                    <option value="">Company Size</option>
                                                    <option value="1-10 employees">1-10 employees</option>
                                                    <option value="11-50 employees">11-50 employees</option>
                                                    <option value="51-200 employees">51-200 employees</option>
                                                    <option value="201-500 employees">201-500 employees</option>
                                                    <option value="501-1000 employees">501-1000 employees</option>
                                                    <option value="1000+ employees">1000+ employees</option>
                                                </select>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-gray-500" />
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={editProfile?.location || ''}
                                                    onChange={handleEditChange}
                                                    className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                                                    placeholder="Location"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Globe size={16} className="text-gray-500" />
                                                <input
                                                    type="text"
                                                    name="website"
                                                    value={editProfile?.website || ''}
                                                    onChange={handleEditChange}
                                                    className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                                                    placeholder="Website"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-4">
                                {!isEditing ? (
                                    <>
                                        <h3 className="font-semibold mb-3">Company Description</h3>
                                        <p className="text-sm text-gray-700 mb-4">{companyProfile?.description}</p>

                                        <h3 className="font-semibold mb-3">Mission Statement</h3>
                                        <p className="text-sm text-gray-700">{companyProfile?.mission}</p>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="font-semibold mb-3">Company Description</h3>
                                        <textarea
                                            name="description"
                                            value={editProfile?.description || ''}
                                            onChange={handleEditChange}
                                            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:border-blue-500 outline-none"
                                            rows={4}
                                            placeholder="Company Description"
                                        />

                                        <h3 className="font-semibold mb-3">Mission Statement</h3>
                                        <textarea
                                            name="mission"
                                            value={editProfile?.mission || ''}
                                            onChange={handleEditChange}
                                            className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 outline-none"
                                            rows={4}
                                            placeholder="Mission Statement"
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}