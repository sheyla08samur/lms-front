"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    HiHome, HiBookOpen, HiUsers, HiChartBar, HiCog, HiQuestionMarkCircle, HiLogout,
    HiSearch, HiChevronLeft, HiChevronRight, HiDotsVertical
} from 'react-icons/hi';
import { FaShieldAlt, FaGraduationCap, FaBook, FaEye } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminUsersPage() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const users = [
        {
            id: 1,
            name: 'Amelia Rodriguez',
            email: 'amelia.r@lms.com',
            role: 'Admin',
            roleColor: 'rgba(168, 85, 247, 0.2)',
            roleTextColor: '#a855f7',
            status: 'Active',
            statusColor: 'rgba(34, 197, 94, 0.2)',
            statusTextColor: '#22c55e',
            permissions: 'Full System Access',
            permissionIcon: FaShieldAlt,
        },
        {
            id: 2,
            name: 'Ben Carter',
            email: 'ben.carter@lms.com',
            role: 'Instructor',
            roleColor: 'rgba(34, 197, 94, 0.2)',
            roleTextColor: '#22c55e',
            status: 'Active',
            statusColor: 'rgba(34, 197, 94, 0.2)',
            statusTextColor: '#22c55e',
            permissions: 'Course Creation & Management',
            permissionIcon: FaGraduationCap,
        },
        {
            id: 3,
            name: 'Chloe Davis',
            email: 'chloe.d@lms.com',
            role: 'Student',
            roleColor: 'rgba(59, 130, 246, 0.2)',
            roleTextColor: '#3b82f6',
            status: 'Inactive',
            statusColor: 'rgba(239, 68, 68, 0.2)',
            statusTextColor: '#ef4444',
            permissions: 'View & Enroll in Courses',
            permissionIcon: FaBook,
        },
        {
            id: 4,
            name: 'David Evans',
            email: 'david.evans@lms.com',
            role: 'Supervisor',
            roleColor: 'rgba(34, 197, 94, 0.2)',
            roleTextColor: '#22c55e',
            status: 'Active',
            statusColor: 'rgba(34, 197, 94, 0.2)',
            statusTextColor: '#22c55e',
            permissions: 'Team Reporting & Oversight',
            permissionIcon: FaEye,
        },
    ];

    const navItems = [
        { href: '/admin/admin-dashboard', icon: HiHome, label: 'Dashboard' },
        { href: '/admin/admin-courses', icon: HiBookOpen, label: 'Courses' },
        { href: '/admin/admin-users', icon: HiUsers, label: 'Users' },
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
        <div 
            className="min-h-screen flex"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            {/* Sidebar */}
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
                        const isActive = pathname === item.href;
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

            {/* Main Content */}
            <main className="flex-1 p-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                            User Management
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Manage all users, roles, and permissions across the platform.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link
                            href="/admin/admin-users/new-user"
                            className="px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                        >
                            + Add New User
                        </Link>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="mb-6 flex gap-4 items-center flex-wrap">
                    <div className="flex-1 min-w-[200px] relative">
                        <HiSearch 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                            style={{ color: 'var(--text-secondary)' }}
                        />
                        <input
                            type="text"
                            placeholder="Search by name, email, or role..."
                            className="w-full rounded-lg pl-10 pr-4 py-2 focus:outline-none transition-all"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                borderColor: 'var(--border)',
                                border: '1px solid',
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = 'var(--accent)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border)';
                            }}
                        />
                    </div>
                    <select 
                        className="rounded-lg px-4 py-2 focus:outline-none transition-all"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            borderColor: 'var(--border)',
                            border: '1px solid',
                        }}
                    >
                        <option>Role</option>
                        <option>Admin</option>
                        <option>Instructor</option>
                        <option>Student</option>
                    </select>
                    <select 
                        className="rounded-lg px-4 py-2 focus:outline-none transition-all"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            borderColor: 'var(--border)',
                            border: '1px solid',
                        }}
                    >
                        <option>Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>

                {/* User Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {users.map((userItem) => (
                        <Link
                            key={userItem.id}
                            href={`/admin/admin-users/${userItem.id}`}
                            className="rounded-lg p-6 border shadow-sm relative transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border)',
                            }}
                        >
                            <button 
                                className="absolute top-4 right-4 transition-colors"
                                style={{ color: 'var(--text-secondary)' }}
                                onClick={(e) => e.preventDefault()}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }}
                            >
                                <HiDotsVertical className="w-5 h-5" />
                            </button>
                            
                            <div className="mb-4">
                                <div 
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-3"
                                    style={{ 
                                        background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
                                    }}
                                >
                                    {getInitials(userItem.name)}
                                </div>
                                <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                                    {userItem.name}
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    {userItem.email}
                                </p>
                            </div>

                            <div className="mb-4 flex gap-2">
                                <span 
                                    className="px-3 py-1 rounded-full text-xs font-medium"
                                    style={{
                                        backgroundColor: userItem.roleColor,
                                        color: userItem.roleTextColor,
                                    }}
                                >
                                    {userItem.role}
                                </span>
                                <span 
                                    className="px-3 py-1 rounded-full text-xs font-medium"
                                    style={{
                                        backgroundColor: userItem.statusColor,
                                        color: userItem.statusTextColor,
                                    }}
                                >
                                    {userItem.status}
                                </span>
                            </div>

                            <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                                    PERMISSIONS
                                </p>
                                <div className="flex items-center gap-2">
                                    <userItem.permissionIcon 
                                        className="w-5 h-5"
                                        style={{ color: 'var(--text-secondary)' }}
                                    />
                                    <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                                        {userItem.permissions}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2">
                    <button 
                        className="p-2 rounded-lg border transition-all duration-200 hover:opacity-80"
                        style={{ 
                            borderColor: 'var(--border)',
                            color: 'var(--text-primary)',
                        }}
                    >
                        <HiChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                        className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
                        style={{ 
                            backgroundColor: 'var(--accent)', 
                            color: 'white' 
                        }}
                    >
                        1
                    </button>
                    <button 
                        className="px-4 py-2 rounded-lg border transition-all duration-200 hover:opacity-80"
                        style={{ 
                            borderColor: 'var(--border)',
                            color: 'var(--text-primary)',
                        }}
                    >
                        2
                    </button>
                    <button 
                        className="px-4 py-2 rounded-lg border transition-all duration-200 hover:opacity-80"
                        style={{ 
                            borderColor: 'var(--border)',
                            color: 'var(--text-primary)',
                        }}
                    >
                        3
                    </button>
                    <span className="px-2" style={{ color: 'var(--text-secondary)' }}>...</span>
                    <button 
                        className="px-4 py-2 rounded-lg border transition-all duration-200 hover:opacity-80"
                        style={{ 
                            borderColor: 'var(--border)',
                            color: 'var(--text-primary)',
                        }}
                    >
                        10
                    </button>
                    <button 
                        className="p-2 rounded-lg border transition-all duration-200 hover:opacity-80"
                        style={{ 
                            borderColor: 'var(--border)',
                            color: 'var(--text-primary)',
                        }}
                    >
                        <HiChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </main>
        </div>
    );
}
