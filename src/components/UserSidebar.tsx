"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiHome, HiBookOpen, HiChartBar, HiCog, HiLogout } from 'react-icons/hi';
import { HiAcademicCap } from 'react-icons/hi';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

interface UserSidebarProps {
    currentPath?: string;
}

export default function UserSidebar({ currentPath }: UserSidebarProps) {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    const navItems = [
        { href: '/user/user-dashboard', icon: HiHome, label: 'Dashboard' },
        { href: '/user/user-courses', icon: HiBookOpen, label: 'Explore Courses' },
        { href: '/user/user-my-courses', icon: HiChartBar, label: 'My Courses' },
    ];

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <aside 
            className="w-64 p-6 flex flex-col min-h-screen border-r sticky top-0"
            style={{ 
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border)',
            }}
        >
            <Link href="/home" className="mb-8">
                <div className="flex items-center gap-3">
                    <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: 'var(--accent)' }}
                    >
                        <HiAcademicCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 
                            className="text-xl font-bold"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Breakline Educate
                        </h2>
                        <p 
                            className="text-xs"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            {user?.role === 'admin' ? 'Admin Panel' : 'Student Portal'}
                        </p>
                    </div>
                </div>
            </Link>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = (currentPath || pathname) === item.href || 
                                    (currentPath || pathname)?.startsWith(item.href + '/');
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                isActive ? '' : 'hover:opacity-80'
                            }`}
                            style={{
                                backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                                color: isActive ? 'white' : 'var(--text-secondary)',
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }
                            }}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {user && (
                <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-primary)' }}>
                    <div className="flex items-center gap-3 mb-2">
                        <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                            style={{ 
                                background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
                            }}
                        >
                            {getInitials(user.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                                {user.name}
                            </p>
                            <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-2">
                <div className="flex items-center justify-center mb-2">
                    <ThemeToggle />
                </div>
                <button
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                >
                    <HiCog className="w-5 h-5" />
                    Settings
                </button>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200"
                    style={{ color: 'var(--error)' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <HiLogout className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}

