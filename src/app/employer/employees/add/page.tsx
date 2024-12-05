"use client";

import React, { useState } from 'react';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import axios from 'axios';
import { config } from '@/utils/config';
import { getCookie } from '@/app/actions';

const AddEmployees = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        physicalAddress: '',
        emailAddress: '',
        phoneNumber: '',
        dateOfBirth: '',
        emergencyPhoneNumber: '',
        educationalLevel: '',
        employmentRole: '',
        employmentStartDate: '',
        bankName: '',
        bankAccountNumber: '',
        bankAccountName: '',
        nextOfKinFullName: '',
        nextOfKinPhoneNumber: '',
        nextOfKinRelationship: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        try {
            const token = await getCookie('jwt_token');

            await axios.post(`${config.BASE_API_URL}/employee`, formData, {
                headers: {
                    'Authorization': `Bearer ${token?.value}`,
                    'Content-Type': 'application/json'
                }
            });

            setSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                physicalAddress: '',
                emailAddress: '',
                phoneNumber: '',
                dateOfBirth: '',
                emergencyPhoneNumber: '',
                educationalLevel: '',
                employmentRole: '',
                employmentStartDate: '',
                bankName: '',
                bankAccountNumber: '',
                bankAccountName: '',
                nextOfKinFullName: '',
                nextOfKinPhoneNumber: '',
                nextOfKinRelationship: ''
            });
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message || 'An error occurred while adding the employee');
            } else if (err.message) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Sidebar
                type="employer"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <Header
                username="Company Admin"
                onMenuClick={() => setIsSidebarOpen(true)}
            />

            <main className="pt-16 p-4 md:p-6 md:ml-64 md:mt-[60px] mt-[30px]">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                    Add New Employee
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">Employee added successfully! An invitation email has been sent.</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                                Personal Information
                            </h3>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    placeholder="Date of Birth"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                                Contact Details
                            </h3>
                            <div className="space-y-4">
                                <input
                                    type="email"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    name="physicalAddress"
                                    value={formData.physicalAddress}
                                    onChange={handleChange}
                                    placeholder="Physical Address"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                                Employment Information
                            </h3>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="employmentRole"
                                    value={formData.employmentRole}
                                    onChange={handleChange}
                                    placeholder="Employment Role"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="date"
                                    name="employmentStartDate"
                                    value={formData.employmentStartDate}
                                    onChange={handleChange}
                                    placeholder="Employment Start Date"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <select
                                    name="educationalLevel"
                                    value={formData.educationalLevel}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Educational Level</option>
                                    <option value="DIPLOMA">Diploma</option>
                                    <option value="BACHELOR_DEGREE">Bachelor&rsquo;s Degree</option>
                                    <option value="MASTERS_DEGREE">Master&rsquo;s Degree</option>
                                    <option value="PHD">PhD</option>
                                </select>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                                Bank Information
                            </h3>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="bankName"
                                    value={formData.bankName}
                                    onChange={handleChange}
                                    placeholder="Bank Name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    name="bankAccountNumber"
                                    value={formData.bankAccountNumber}
                                    onChange={handleChange}
                                    placeholder="Bank Account Number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    name="bankAccountName"
                                    value={formData.bankAccountName}
                                    onChange={handleChange}
                                    placeholder="Bank Account Name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                                Emergency Contact
                            </h3>
                            <div className="space-y-4">
                                <input
                                    type="tel"
                                    name="emergencyPhoneNumber"
                                    value={formData.emergencyPhoneNumber}
                                    onChange={handleChange}
                                    placeholder="Emergency Phone Number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    name="nextOfKinFullName"
                                    value={formData.nextOfKinFullName}
                                    onChange={handleChange}
                                    placeholder="Next of Kin Full Name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="tel"
                                    name="nextOfKinPhoneNumber"
                                    value={formData.nextOfKinPhoneNumber}
                                    onChange={handleChange}
                                    placeholder="Next of Kin Phone Number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    name="nextOfKinRelationship"
                                    value={formData.nextOfKinRelationship}
                                    onChange={handleChange}
                                    placeholder="Next of Kin Relationship"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Add Employee'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AddEmployees;
