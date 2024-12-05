"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import { Edit, FileText, Briefcase, MapPin, Mail, Phone, Save, X, Upload } from 'lucide-react';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { config, cloudinaryConfig } from '@/utils/config';
import axios from 'axios';
import { getCookie } from '@/app/actions';
import { getUser } from '@/services/auth-requests';
import MessageBox from '@/components/auth/MessageBox';

const JobSeekerSetupForm = ({ onSetupComplete }: { onSetupComplete: (profile: any) => void }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        location: '',
        linkedInProfile: '',
        professionalSummary: '',
        educationalLevel: ''
    });
    const [error, setError] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser();
            setUser(data.response);
            setFormData((prev: any) => ({
                ...prev,
                fullName: data.response.userName,
                email: data.response.email,
            }));
        }

        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = await getCookie('jwt_token');
            const response = await axios.post(`${config.BASE_API_URL}/job-seeker`, formData, {
                headers: {
                    'Authorization': `Bearer ${token?.value}`,
                }
            });
            onSetupComplete(response.data);
        } catch (error: any) {
            setError(Array.isArray(error.response.data.message)
                ? error.response.data.message[0]
                : error.response.data.message
            );
        }
    };

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
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-center">Create Your Profile</h2>
                    {error && <MessageBox message={error} isError={true} />}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            className="w-full border border-gray-300 rounded-md p-2"
                            readOnly
                        />
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Address"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                        <input
                            type="text"
                            name="linkedInProfile"
                            value={formData.linkedInProfile}
                            onChange={handleChange}
                            placeholder="LinkedIn Profile URL"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                        <textarea
                            name="professionalSummary"
                            value={formData.professionalSummary}
                            onChange={handleChange}
                            placeholder="Professional Summary"
                            className="w-full border border-gray-300 rounded-md p-2"
                            rows={4}
                        />
                        <select
                            name="educationalLevel"
                            value={formData.educationalLevel}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Select Education Level</option>
                            <option value="DIPLOMA">Diploma</option>
                            <option value="BACHELORS_DEGREE">Bachelor&rsquo;s Degree</option>
                            <option value="MASTERS_DEGREE">Master&rsquo;s Degree</option>
                            <option value="PHD">PhD</option>
                        </select>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Create Profile
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default function JobSeekerProfile() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [profile, setProfile] = useState<Record<string, any> | null>(null);
    const [editProfile, setEditProfile] = useState<Record<string, any> | null>(null);
    const [user, setUser] = useState<Record<string, any> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobSeekerProfile = async () => {
            try {
                const token = await getCookie('jwt_token');
                const response = await axios.get(`${config.BASE_API_URL}/job-seeker`, {
                    headers: {
                        'Authorization': `Bearer ${token?.value}`,
                    }
                });

                setProfile(response.data);
                setIsLoading(false);
            } catch (error: any) {
                if (error.response && error.response.status === 404) {
                    setIsLoading(false);
                } else {
                    setError(Array.isArray(error.response.data.message)
                        ? error.response.data.message[0]
                        : error.response.data.message);
                    setIsLoading(false);
                }
            }
        };

        fetchJobSeekerProfile();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser();
            setUser(data.response);
        }

        fetchUser();
    }, []);

    const handleProfilePictureChange = async (e: ChangeEvent<HTMLInputElement>) => {
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

                setProfilePicturePreview(uploadedImageUrl);
                setEditProfile((prev) => ({
                    ...prev,
                    profilePicture: uploadedImageUrl,
                }));
            } catch (error) {
                setError("Failed to upload the profile picture to Cloudinary.");
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        }
    };

    const handleSetupComplete = (newProfile: any) => {
        setProfile(newProfile);
    };

    const startEditing = () => {
        setEditProfile({ ...profile });
        setProfilePicturePreview(profile?.profilePicture || null);
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
        setProfilePicture(null);
        setProfilePicturePreview(null);
        setIsEditing(false);
    };

    const saveProfile = async () => {
        try {
            const token = await getCookie('jwt_token');

            const response = await axios.put(`${config.BASE_API_URL}/job-seeker`, editProfile, {
                headers: {
                    'Authorization': `Bearer ${token?.value}`,
                }
            });

            setProfile(response.data);
            setIsEditing(false);
            setProfilePicture(null);

            setSuccessMessage("Profile updated successfully");
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error: any) {
            setError(Array.isArray(error.response.data.message)
                ? error.response.data.message[0]
                : error.response.data.message);
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

    if (!profile) {
        return <JobSeekerSetupForm onSetupComplete={handleSetupComplete} />;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Sidebar
                type="jobseeker"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <Header
                username={user?.fullName}
                onMenuClick={() => setIsSidebarOpen(true)}
            />

            <MessageBox message={error} isError={true} />
            <MessageBox message={successMessage} isError={false} />

            <main className="pt-16 p-4 md:p-6 md:ml-64 md:mt-[60px] mt-[30px]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-base md:text-lg font-semibold flex items-center gap-2">
                            <FileText size={20} /> Job Seeker Profile
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
                                    src={profilePicturePreview || profile?.profilePicture || "https://via.placeholder.com/150"}
                                    alt="Profile Picture"
                                    width={150}
                                    height={150}
                                    className="rounded-lg object-cover"
                                />
                                {isEditing && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                                        <label htmlFor="profile-picture-upload" className="cursor-pointer">
                                            <Upload size={24} color="white" />
                                            <input
                                                type="file"
                                                id="profile-picture-upload"
                                                accept=".jpg,.jpeg,.png,.gif"
                                                className="hidden"
                                                onChange={handleProfilePictureChange}
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                            {!isEditing ? (
                                <div>
                                    <h2 className="text-lg md:text-xl font-bold">{profile?.fullName}</h2>
                                    <p className="text-gray-600 text-sm">{profile?.professionalSummary}</p>
                                </div>
                            ) : (
                                <div className="flex-grow">
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={editProfile?.fullName || ''}
                                        onChange={handleEditChange}
                                        className="text-lg md:text-xl font-bold w-full border-b border-gray-300 focus:border-blue-500 outline-none mb-2"
                                    />
                                    <textarea
                                        name="professionalSummary"
                                        value={editProfile?.professionalSummary || ''}
                                        onChange={handleEditChange}
                                        className="text-sm text-gray-600 w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                                        rows={2}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg shadow-sm p-4">
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                    <FileText size={16} /> Personal Information
                                </h3>
                                <div className="space-y-2 text-sm">
                                    {!isEditing ? (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <Mail size={16} className="text-gray-500" />
                                                <span>Email: {profile?.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone size={16} className="text-gray-500" />
                                                <span>Phone: {profile?.phoneNumber}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-gray-500" />
                                                <span>Location: {profile?.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Briefcase size={16} className="text-gray-500" />
                                                <span>LinkedIn: {profile?.linkedInProfile}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Mail size={16} className="text-gray-500" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={editProfile?.email || ''}
                                                    onChange={handleEditChange}
                                                    className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                                                    placeholder="Email"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone size={16} className="text-gray-500" />
                                                <input
                                                    type="tel"
                                                    name="phoneNumber"
                                                    value={editProfile?.phoneNumber || ''}
                                                    onChange={handleEditChange}
                                                    className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                                                    placeholder="Phone Number"
                                                />
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
                                                <Briefcase size={16} className="text-gray-500" />
                                                <input
                                                    type="text"
                                                    name="linkedInProfile"
                                                    value={editProfile?.linkedInProfile || ''}
                                                    onChange={handleEditChange}
                                                    className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                                                    placeholder="LinkedIn Profile URL"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-4">
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                    <Briefcase size={16} /> Professional Details
                                </h3>
                                <div className="space-y-2 text-sm">
                                    {!isEditing ? (
                                        <div className="flex items-center gap-2">
                                            <span>Education Level: {profile?.educationalLevel}</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <select
                                                name="educationalLevel"
                                                value={editProfile?.educationalLevel || ''}
                                                onChange={handleEditChange}
                                                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                                            >
                                                <option value="">Select Education Level</option>
                                                <option value="DIPLOMA">Diploma</option>
                                                <option value="BACHELORS_DEGREE">Bachelor&rsquo;s Degree</option>
                                                <option value="MASTERS_DEGREE">Master&rsquo;s Degree</option>
                                                <option value="PHD">PhD</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}