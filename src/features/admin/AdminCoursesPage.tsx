"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiHome, HiBookOpen, HiUsers, HiCog, HiQuestionMarkCircle, HiSearch, HiLogout } from 'react-icons/hi';
import { HiAcademicCap } from 'react-icons/hi';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminCoursesPage() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const courses = [
        { id: 1, title: 'Introduction to Quantum Computing', instructor: 'Dr. Evelyn Reed', students: 1248, status: 'Published', progress: 85 },
        { id: 2, title: 'Data Visualization with D3.js', instructor: 'Leo Martinez', students: 892, status: 'Draft', progress: 45 },
        { id: 3, title: 'Advanced SEO Strategies', instructor: 'Chen Wei', students: 2103, status: 'Published', progress: 92 },
        { id: 4, title: 'Foundations of Project Management', instructor: 'Aisha Khan', students: 1567, status: 'Published', progress: 78 },
    ];

    const navItems = [
        { href: '/admin/admin-dashboard', icon: HiHome, label: 'Dashboard' },
        { href: '/admin/admin-courses', icon: HiBookOpen, label: 'Courses' },
        { href: '/admin/admin-users', icon: HiUsers, label: 'Users' },
    ];

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
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                            Courses
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Manage all courses in the platform
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link
                            href="/admin/admin-courses/new-course"
                            className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                        >
                            + Create Course
                        </Link>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="mb-6 flex gap-4">
                    <div className="flex-1 relative">
                        <HiSearch 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                            style={{ color: 'var(--text-secondary)' }}
                        />
                        <input 
                            type="text" 
                            placeholder="Search courses..." 
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
                        <option>All Status</option>
                        <option>Published</option>
                        <option>Draft</option>
                    </select>
                </div>

                {/* Courses Table */}
                <div 
                    className="rounded-lg border overflow-hidden"
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border)',
                    }}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                        Course
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                        Instructor
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                        Students
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                        Progress
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr 
                                        key={course.id} 
                                        className="border-b transition-colors hover:opacity-80"
                                        style={{ borderColor: 'var(--border)' }}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                                {course.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>
                                            {course.instructor}
                                        </td>
                                        <td className="px-6 py-4" style={{ color: 'var(--text-primary)' }}>
                                            {course.students.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span 
                                                className="px-3 py-1 rounded-full text-xs font-medium"
                                                style={{
                                                    backgroundColor: course.status === 'Published' 
                                                        ? 'rgba(34, 197, 94, 0.2)' 
                                                        : 'rgba(234, 179, 8, 0.2)',
                                                    color: course.status === 'Published' 
                                                        ? 'var(--success)' 
                                                        : 'var(--warning)',
                                                }}
                                            >
                                                {course.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div 
                                                    className="flex-1 rounded-full h-2"
                                                    style={{ backgroundColor: 'var(--bg-tertiary)' }}
                                                >
                                                    <div 
                                                        className="h-2 rounded-full transition-all"
                                                        style={{ 
                                                            width: `${course.progress}%`,
                                                            backgroundColor: 'var(--accent)',
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                    {course.progress}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/admin/admin-courses/edit-course?id=${course.id}`}
                                                    className="text-sm transition-colors hover:opacity-80"
                                                    style={{ color: 'var(--accent)' }}
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={`/admin/admin-courses/${course.id}`}
                                                    className="text-sm transition-colors hover:opacity-80"
                                                    style={{ color: 'var(--accent)' }}
                                                >
                                                    View
                                                </Link>
                                                <button 
                                                    className="text-sm transition-colors hover:opacity-80"
                                                    style={{ color: 'var(--error)' }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
