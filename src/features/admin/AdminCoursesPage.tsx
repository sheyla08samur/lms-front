"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import AdminSidebar from '@/components/AdminSidebar';
import { useCourses } from '@/hooks/useCourses';

export default function AdminCoursesPage() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const { courses, loading, error, deleteCourse } = useCourses();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('All Status');
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            return;
        }

        try {
            setDeletingId(id);
            await deleteCourse(id);
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to delete course');
        } finally {
            setDeletingId(null);
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All Status' || course.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div 
            className="min-h-screen flex"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            <AdminSidebar />
            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto" style={{ backgroundColor: 'var(--bg-primary)' }}>
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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
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

                {error && (
                    <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' }}>
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="text-center py-12">
                        <div 
                            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                            style={{ borderColor: 'var(--accent)' }}
                        />
                        <p style={{ color: 'var(--text-secondary)' }}>Loading courses...</p>
                    </div>
                )}

                {/* Courses Table */}
                {!loading && (
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
                                            Level
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCourses.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center" style={{ color: 'var(--text-secondary)' }}>
                                                No courses found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredCourses.map((course) => (
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
                                                <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>
                                                    {course.level}
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
                                                            onClick={() => handleDelete(course.id, course.title)}
                                                            disabled={deletingId === course.id}
                                                            className="text-sm transition-colors hover:opacity-80 disabled:opacity-50"
                                                            style={{ color: 'var(--error)' }}
                                                        >
                                                            {deletingId === course.id ? 'Deleting...' : 'Delete'}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
