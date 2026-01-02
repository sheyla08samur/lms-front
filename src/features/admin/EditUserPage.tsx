"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import ThemeToggle from '@/components/ThemeToggle';
import { useUsers } from '@/hooks/useUsers';
import type { UpdateUserDto } from '@/lib/types';

interface EditUserPageProps {
    userId?: string;
}

export default function EditUserPage({ userId }: EditUserPageProps) {
    const router = useRouter();
    const { getUser, updateUser } = useUsers();
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [formData, setFormData] = useState<UpdateUserDto>({
        id: userId || '',
        name: '',
        email: '',
        role: 'user',
    });
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (userId) {
            loadUser();
        } else {
            setError('User ID is required');
            setLoading(false);
        }
    }, [userId]);

    const loadUser = async () => {
        if (!userId) return;
        
        try {
            setLoading(true);
            const user = await getUser(userId);
            if (user) {
                setFormData({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                });
            } else {
                setError('User not found');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load user');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            if (!formData.name?.trim() || !formData.email?.trim()) {
                throw new Error('Please fill in all required fields');
            }

            const updateData: UpdateUserDto = { ...formData };
            if (password.trim()) {
                updateData.password = password;
            }

            await updateUser(updateData);
            router.push(`/admin/admin-users/${formData.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update user');
        } finally {
            setSubmitting(false);
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
    return (
        <div 
            className="min-h-screen flex"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            <AdminSidebar />
            <main className="flex-1 p-8">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                Edit User
                            </h1>
                            <p style={{ color: 'var(--text-secondary)' }}>Update user information</p>
                        </div>
                        <ThemeToggle />
                    </div>

                    {error && (
                        <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div 
                            className="rounded-lg p-8 border"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border)',
                            }}
                        >
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name || ''}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full rounded-lg px-4 py-3 focus:outline-none transition-all"
                                        style={{
                                            backgroundColor: 'var(--bg-primary)',
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

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email || ''}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full rounded-lg px-4 py-3 focus:outline-none transition-all"
                                        style={{
                                            backgroundColor: 'var(--bg-primary)',
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

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                                        Role *
                                    </label>
                                    <select 
                                        required
                                        value={formData.role || 'user'}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value as 'user' | 'admin' })}
                                        className="w-full rounded-lg px-4 py-3 focus:outline-none transition-all"
                                        style={{
                                            backgroundColor: 'var(--bg-primary)',
                                            color: 'var(--text-primary)',
                                            borderColor: 'var(--border)',
                                            border: '1px solid',
                                        }}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                                        New Password (leave blank to keep current)
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className="w-full rounded-lg px-4 py-3 focus:outline-none transition-all"
                                        style={{
                                            backgroundColor: 'var(--bg-primary)',
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
                            </div>

                            <div className="mt-8 flex justify-end gap-4">
                                <Link
                                    href="/admin/admin-users"
                                    className="px-6 py-3 rounded-lg border transition-all duration-200 hover:opacity-80"
                                    style={{ 
                                        borderColor: 'var(--border)',
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    Cancel
                                </Link>
                                <button 
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                                    style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                                >
                                    {submitting ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
