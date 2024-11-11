import { Bell, Menu } from 'lucide-react';

interface HeaderProps {
    username: string;
    onMenuClick: () => void;
}

export function Header({ username, onMenuClick }: HeaderProps) {
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
                <div className="flex items-center gap-3 md:gap-4">
                    <button className="relative">
                        <Bell size={20} className="text-gray-600" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                            3
                        </span>
                    </button>
                    <div className="w-8 h-8 bg-blue-100 rounded-full" />
                </div>
            </div>
        </header>
    );
}
