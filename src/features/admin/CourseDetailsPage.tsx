"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import ThemeToggle from '@/components/ThemeToggle';
import { useCourses } from '@/hooks/useCourses';
import type { Course } from '@/lib/types';

interface CourseDetailsPageProps {
    courseId: string;
}

export default function CourseDetailsPage({ courseId }: CourseDetailsPageProps) {
    const router = useRouter();
    const { getCourse, deleteCourse } = useCourses();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        loadCourse();
    }, [courseId]);

    const loadCourse = async () => {
        try {
            setLoading(true);
            const data = await getCourse(courseId);
            setCourse(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load course');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!course) return;
        
        if (!confirm(`Are you sure you want to delete "${course.title}"? This action cannot be undone.`)) {
            return;
        }

        try {
            setDeleting(true);
            await deleteCourse(courseId);
            router.push('/admin/admin-courses');
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to delete course');
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: 'var(--accent)' }} />
                    <p style={{ color: 'var(--text-secondary)' }}>Loading course...</p>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="text-center">
                    <p style={{ color: 'var(--error)' }}>{error || 'Course not found'}</p>
                    <Link href="/admin/admin-courses" className="mt-4 inline-block text-blue-500">Back to Courses</Link>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="min-h-screen flex"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            <AdminSidebar />
            <main className="flex-1 p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8 flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                {course.title}
                            </h1>
                            <p style={{ color: 'var(--text-secondary)' }}>Course ID: {course.id}</p>
                            <p style={{ color: 'var(--text-secondary)' }}>Course Details and Information</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <div className="flex gap-3">
                                <Link
                                    href={`/admin/admin-courses/edit-course?id=${course.id}`}
                                    className="px-4 py-2 rounded-lg border transition-all duration-200 hover:opacity-80"
                                    style={{ 
                                        borderColor: 'var(--border)',
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    Edit
                                </Link>
                                <button 
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                                    style={{ backgroundColor: 'var(--error)', color: 'white' }}
                                >
                                    {deleting ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="rounded-lg p-8 border mb-6"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="text-sm mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                                    Instructor
                                </label>
                                <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                                    {course.instructor}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                                    Students Enrolled
                                </label>
                                <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                                    {course.students.toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                                    Duration
                                </label>
                                <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                                    {course.duration}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                                    Level
                                </label>
                                <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                                    {course.level}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                                    Status
                                </label>
                                <span 
                                    className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                                    style={{
                                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                                        color: '#22c55e',
                                    }}
                                >
                                    {course.status}
                                </span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="text-sm mb-2 block" style={{ color: 'var(--text-secondary)' }}>
                                Description
                            </label>
                            <p className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                                {course.description}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm mb-2 block" style={{ color: 'var(--text-secondary)' }}>
                                Tags
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {course.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded-full text-sm"
                                        style={{
                                            backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                            color: 'var(--accent)',
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div 
                            className="rounded-lg p-6 border"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border)',
                            }}
                        >
                            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                                Completion Rate
                            </p>
                            <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>76%</p>
                        </div>
                        <div 
                            className="rounded-lg p-6 border"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border)',
                            }}
                        >
                            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                                Average Score
                            </p>
                            <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>88.2%</p>
                        </div>
                        <div 
                            className="rounded-lg p-6 border"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border)',
                            }}
                        >
                            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                                Active Learners
                            </p>
                            <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>1,482</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
