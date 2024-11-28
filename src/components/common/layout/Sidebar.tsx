import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Home, Briefcase, Bell, User, LogOut, X, Users, FileText } from 'lucide-react';
import { logout } from "@/services/auth-requests";

interface SidebarProps {
    type: 'employer' | 'jobseeker' | 'employee';
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ type, isOpen, onClose }: SidebarProps) {
    const links = type === 'employer'
        ? [
            { href: '/employer/dashboard', icon: Home, label: 'Dashboard' },
            { href: '/employer/jobs', icon: Briefcase, label: 'Jobs' },
            { href: '/employer/applications', icon: Bell, label: 'Applications' },
            { href: '/employer/employees', icon: Users, label: 'Employees' },
            { href: '/employer/profile', icon: User, label: 'Company Profile' },
        ]
        : type === 'jobseeker' ? [
            { href: '/jobseeker/dashboard', icon: Home, label: 'Dashboard' },
            { href: '/jobseeker/jobs', icon: Briefcase, label: 'Browse Jobs' },
            { href: '/jobseeker/applications', icon: Bell, label: 'My Applications' },
            { href: '/jobseeker/profile', icon: User, label: 'Profile' },
        ] : [
            { href: '/employee/dashboard', icon: Home, label: 'Dashboard' },
            { href: '/employee/applications', icon: FileText, label: 'Applications' },
            { href: '/employee/jobs', icon: Briefcase, label: 'Jobs' },
            { href: '/employee/profile', icon: User, label: 'Profile' },
        ];

    const router = useRouter();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={onClose}
                />
            )}

            <div className={`
                w-64 bg-white h-screen border-r fixed left-0 top-0 z-40
                transform transition-transform duration-200 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}>
                <div className="p-4 flex items-center justify-between">
                    <h1 className="text-xl md:text-2xl font-bold text-blue-600">KHR</h1>
                    <button
                        onClick={onClose}
                        className="md:hidden p-1 hover:bg-gray-100 rounded-lg"
                        aria-label="Close menu"
                    >
                        <X size={20} className="text-gray-600" />
                    </button>
                </div>
                <nav className="mt-6 md:mt-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => onClose()}
                        >
                            <link.icon size={20} />
                            <span>{link.label}</span>
                        </Link>
                    ))}
                    <button
                        className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-gray-600 hover:bg-blue-50 hover:text-blue-600 w-full mt-6 md:mt-8"
                        onClick={async () => {
                            await logout();
                            router.replace("/login");
                        }}
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </nav>
            </div>
        </>
    );
}
