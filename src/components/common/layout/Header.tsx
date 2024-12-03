import { Menu, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
    username: string;
    onMenuClick: () => void;
}

export function Header({ username, onMenuClick }: HeaderProps) {
    const router = useRouter();

    return (
        <header className="h-16 bg-white border-b fixed top-0 right-0 left-0 md:left-64 z-20">
            <div className="h-full flex items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-1 hover:bg-gray-100 rounded-lg"
                        aria-label="Toggle menu"
                    >
                        <Menu size={24} className="text-gray-600" />
                    </button>
                    <div className="text-base md:text-lg font-semibold text-gray-800">Welcome back, {username}</div>
                </div>
                <div
                    className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 cursor-pointer"
                    onClick={() => router.push('/employer/profile')}
                >
                    <User
                        color="#2563eb"
                        size={24}
                        strokeWidth={1.5}
                    />
                </div>
            </div>
        </header>
    );
}
