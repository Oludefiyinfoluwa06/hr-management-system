import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '@/app/actions';
import { config } from '@/utils/config';
import {
    Users,
    Mail,
    Phone,
    Calendar,
    Briefcase,
    MapPin,
    BookOpen,
    Building2,
    CreditCard,
    X
} from 'lucide-react';

interface EmployeeDetailsModalProps {
    employeeId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

interface EmployeeDetails {
    firstName: string;
    lastName: string;
    physicalAddress: string;
    emailAddress: string;
    phoneNumber: string;
    dateOfBirth: string;
    emergencyPhoneNumber: string;
    educationalLevel: string;
    employmentRole: string;
    employmentStartDate: string;
    bankName: string;
    bankAccountNumber: string;
    bankAccountName: string;
    nextOfKinFullName: string;
    nextOfKinPhoneNumber: string;
    nextOfKinRelationship: string;
}

export const EmployeeDetailsModal: React.FC<EmployeeDetailsModalProps> = ({
    employeeId,
    isOpen,
    onClose
}) => {
    const [employeeDetails, setEmployeeDetails] = useState<EmployeeDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployeeDetails = async () => {
        if (!employeeId) return;

        try {
            setLoading(true);
            const token = await getCookie('jwt_token');

            const response = await axios.get(
                `${config.BASE_API_URL}/employee/${employeeId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token?.value}`
                    }
                }
            );

            setEmployeeDetails(response.data);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch employee details');
            setEmployeeDetails(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && employeeId) {
            fetchEmployeeDetails();
        }
    }, [isOpen, employeeId]);

    const DetailRow = ({
        icon: Icon,
        label,
        value
    }: {
        icon: React.ElementType,
        label: string,
        value: string
    }) => (
        <div className="flex items-center gap-3 py-2 border-b">
            <Icon className="text-gray-500" size={16} />
            <div>
                <span className="text-xs text-gray-500">{label}</span>
                <p className="text-sm font-medium">{value || 'N/A'}</p>
            </div>
        </div>
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Employee Details</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-6">Loading employee details...</div>
                    ) : error ? (
                        <div className="bg-red-100 text-red-600 p-4 rounded">
                            {error}
                        </div>
                    ) : employeeDetails ? (
                        <div className="space-y-4">
                            <div className="text-center">
                                <h2 className="text-xl font-bold">
                                    {employeeDetails.firstName} {employeeDetails.lastName}
                                </h2>
                                <p className="text-sm text-gray-500">{employeeDetails.employmentRole}</p>
                            </div>

                            <div>
                                <DetailRow
                                    icon={Mail}
                                    label="Email"
                                    value={employeeDetails.emailAddress}
                                />
                                <DetailRow
                                    icon={Phone}
                                    label="Phone Number"
                                    value={employeeDetails.phoneNumber}
                                />
                                <DetailRow
                                    icon={Calendar}
                                    label="Date of Birth"
                                    value={employeeDetails.dateOfBirth
                                        ? new Date(employeeDetails.dateOfBirth).toLocaleDateString()
                                        : 'N/A'
                                    }
                                />
                                <DetailRow
                                    icon={Briefcase}
                                    label="Employment Role"
                                    value={employeeDetails.employmentRole}
                                />
                                <DetailRow
                                    icon={Calendar}
                                    label="Employment Start Date"
                                    value={employeeDetails.employmentStartDate
                                        ? new Date(employeeDetails.employmentStartDate).toLocaleDateString()
                                        : 'N/A'
                                    }
                                />
                                <DetailRow
                                    icon={MapPin}
                                    label="Physical Address"
                                    value={employeeDetails.physicalAddress}
                                />
                                <DetailRow
                                    icon={BookOpen}
                                    label="Educational Level"
                                    value={employeeDetails.educationalLevel}
                                />
                                <DetailRow
                                    icon={Building2}
                                    label="Bank Name"
                                    value={employeeDetails.bankName}
                                />
                                <DetailRow
                                    icon={CreditCard}
                                    label="Bank Account Number"
                                    value={employeeDetails.bankAccountNumber}
                                />

                                <div className="mt-4 bg-gray-50 p-3 rounded">
                                    <h3 className="text-sm font-semibold mb-2">Next of Kin</h3>
                                    <DetailRow
                                        icon={Users}
                                        label="Full Name"
                                        value={employeeDetails.nextOfKinFullName}
                                    />
                                    <DetailRow
                                        icon={Phone}
                                        label="Phone Number"
                                        value={employeeDetails.nextOfKinPhoneNumber}
                                    />
                                    <DetailRow
                                        icon={Users}
                                        label="Relationship"
                                        value={employeeDetails.nextOfKinRelationship}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
