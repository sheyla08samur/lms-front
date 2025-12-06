"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiHome, HiBookOpen, HiUsers, HiCog, HiLogout } from 'react-icons/hi';
import { HiAcademicCap } from 'react-icons/hi';
import { useAuth } from '@/contexts/AuthContext';

interface AdminSidebarProps {
    currentPath?: string;
}

export default function AdminSidebar({ currentPath }: AdminSidebarProps) {
    const pathname = usePathname();
    const { logout } = useAuth();

    const navItems = [
        { href: '/admin/admin-dashboard', icon: HiHome, label: 'Dashboard' },
        { href: '/admin/admin-courses', icon: HiBookOpen, label: 'Courses' },
        { href: '/admin/admin-users', icon: HiUsers, label: 'Users' },
    ];

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
                            Admin Panel
                        </p>
                    </div>
                </div>
            </Link>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = (currentPath || pathname) === item.href;
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

            <Link
                href="/admin/admin-courses/new-course"
                className="w-full py-3 px-4 rounded-lg font-medium mb-4 text-center transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: 'var(--accent)', color: 'white' }}
            >
                Create Course
            </Link>

            <div className="space-y-2">
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

