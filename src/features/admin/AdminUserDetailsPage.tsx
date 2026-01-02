"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import ThemeToggle from '@/components/ThemeToggle';
import { FaShieldAlt } from 'react-icons/fa';
import { useUsers } from '@/hooks/useUsers';
import { useEnrollments } from '@/hooks/useEnrollments';
import type { User } from '@/lib/types';

interface AdminUserDetailsPageProps {
    userId: string;
}

export default function AdminUserDetailsPage({ userId }: AdminUserDetailsPageProps) {
    const { getUser } = useUsers();
    const { enrollments, fetchEnrollments } = useEnrollments(userId);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadUser();
        fetchEnrollments(userId);
    }, [userId]);

    const loadUser = async () => {
        try {
            setLoading(true);
            const data = await getUser(userId);
            setUser(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load user');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: 'var(--accent)' }} />
                    <p style={{ color: 'var(--text-secondary)' }}>Loading user...</p>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="text-center">
                    <p style={{ color: 'var(--error)' }}>{error || 'User not found'}</p>
                    <Link href="/admin/admin-users" className="mt-4 inline-block text-blue-500">Back to Users</Link>
                </div>
            </div>
        );
    }

    const completedCourses = enrollments.filter(e => e.progress >= 100).length;

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div 
            className="min-h-screen flex"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            <AdminSidebar />
            <main className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                User Details
                            </h1>
                            <p style={{ color: 'var(--text-secondary)' }}>View and manage user information</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <Link
                                href={`/admin/admin-users/edit-user?id=${user.id}`}
                                className="px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90"
                                style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                            >
                                Edit User
                            </Link>
                        </div>
                    </div>

                    <div 
                        className="rounded-lg p-8 border mb-6"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <div className="flex items-start gap-6 mb-6">
                            <div 
                                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold"
                                style={{ 
                                    background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
                                }}
                            >
                                {getInitials(user.name)}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                    {user.name}
                                </h2>
                                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{user.email}</p>
                                <div className="flex gap-3">
                                    <span 
                                        className="px-3 py-1 rounded-full text-sm font-medium"
                                        style={{
                                            backgroundColor: 'rgba(168, 85, 247, 0.2)',
                                            color: '#a855f7',
                                        }}
                                    >
                                        {user.role}
                                    </span>
                                    <span 
                                        className="px-3 py-1 rounded-full text-sm font-medium"
                                        style={{
                                            backgroundColor: 'rgba(34, 197, 94, 0.2)',
                                            color: '#22c55e',
                                        }}
                                    >
                                        {user.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                            <div>
                                <label className="text-sm mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                                    Joined Date
                                </label>
                                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                                    User ID
                                </label>
                                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{user.id}</p>
                            </div>
                            <div>
                                <label className="text-sm mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                                    Courses Enrolled
                                </label>
                                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{enrollments.length}</p>
                            </div>
                            <div>
                                <label className="text-sm mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                                    Courses Completed
                                </label>
                                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{completedCourses}</p>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="rounded-lg p-8 border"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                            Permissions
                        </h3>
                        <div className="space-y-2">
                            <div 
                                className="flex items-center gap-3 p-3 rounded-lg"
                                style={{ backgroundColor: 'var(--bg-primary)' }}
                            >
                                <FaShieldAlt className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                                <span style={{ color: 'var(--text-primary)' }}>Full System Access</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
