"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { Users, Plus, Mail, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { getCookie } from '@/app/actions';
import { config } from '@/utils/config';
import { EmployeeDetailsModal } from '@/components/employer/EmployeeDetailsModal';

const truncateEmail = (email: string) => {
    const [username] = email.split('@');
    return `${username}@...`;
};

export default function Employees() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [employees, setEmployees] = useState<any>([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 0,
        limit: 10
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchEmployees = async (page = 1) => {
        try {
            setLoading(true);

            const token = await getCookie('jwt_token');

            const response = await axios.get(`${config.BASE_API_URL}/employee`, {
                params: {
                    page,
                    limit: pagination.limit
                },
                headers: {
                    'Authorization': `Bearer ${token?.value}`
                }
            });

            const { results, totalPages, currentPage } = response.data;

            setEmployees(results);
            setPagination(prev => ({
                ...prev,
                currentPage,
                totalPages
            }));
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch employees');
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handlePageChange = (newPage: any) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            fetchEmployees(newPage);
        }
    };

    const openEmployeeDetails = (employeeId: string) => {
        setSelectedEmployeeId(employeeId);
        setIsModalOpen(true);
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
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-base md:text-lg font-semibold flex items-center gap-2">
                        <Users size={20} /> Employees
                    </h1>
                    <Link href="employees/add" className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700">
                        <Plus size={16} /> Add Employee
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                        Loading employees...
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="grid grid-cols-6 text-xs md:text-sm font-semibold text-gray-600 px-4 py-3 border-b sticky top-0 bg-white z-10">
                                <div className="col-span-2">Employee</div>
                                <div className="col-span-1">Role</div>
                                <div className="col-span-1">Email</div>
                                <div className="col-span-1">Actions</div>
                            </div>

                            {/* Scrollable container */}
                            <div className="max-h-[50vh] overflow-y-auto">
                                {employees.length === 0 ? (
                                    <div className="text-center py-6 text-gray-500">
                                        No employees found
                                    </div>
                                ) : (
                                    employees.map((employee: any) => (
                                        <div
                                            key={employee._id}
                                            className="grid grid-cols-6 items-center px-4 py-3 border-b hover:bg-gray-50 transition"
                                        >
                                            <div className="col-span-2 flex items-center gap-3">
                                                <div>
                                                    <h3 className="font-semibold text-xs md:text-sm">
                                                        {employee.firstName} {employee.lastName}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="text-xs md:text-sm capitalize col-span-1">{employee.employmentRole}</div>
                                            <div className="text-xs md:text-sm flex flex-col col-span-1">
                                                <div className="flex items-center gap-1">
                                                    <Mail size={12} className="text-gray-500" />
                                                    <span title={employee.emailAddress}>
                                                        {truncateEmail(employee.emailAddress)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <button
                                                    onClick={() => openEmployeeDetails(employee._id)}
                                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                >
                                                    <Eye size={12} /> View
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

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
                    </>
                )}

                <EmployeeDetailsModal
                    employeeId={selectedEmployeeId}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedEmployeeId(null);
                    }}
                />
            </main>
        </div>
    );
}
