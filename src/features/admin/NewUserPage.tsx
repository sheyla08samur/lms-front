"use client";

import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';
import ThemeToggle from '@/components/ThemeToggle';

export default function NewUserPage() {
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
                                Create New User
                            </h1>
                            <p style={{ color: 'var(--text-secondary)' }}>Add a new user to the platform</p>
                        </div>
                        <ThemeToggle />
                    </div>

                    <div 
                        className="rounded-lg p-8 border"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter first name"
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
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter last name"
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

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter email address"
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
                                    Role
                                </label>
                                <select 
                                    className="w-full rounded-lg px-4 py-3 focus:outline-none transition-all"
                                    style={{
                                        backgroundColor: 'var(--bg-primary)',
                                        color: 'var(--text-primary)',
                                        borderColor: 'var(--border)',
                                        border: '1px solid',
                                    }}
                                >
                                    <option>Select a role</option>
                                    <option>Admin</option>
                                    <option>Instructor</option>
                                    <option>Student</option>
                                    <option>Supervisor</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
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
                                    Status
                                </label>
                                <select 
                                    className="w-full rounded-lg px-4 py-3 focus:outline-none transition-all"
                                    style={{
                                        backgroundColor: 'var(--bg-primary)',
                                        color: 'var(--text-primary)',
                                        borderColor: 'var(--border)',
                                        border: '1px solid',
                                    }}
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
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
                                className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:opacity-90"
                                style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                            >
                                Create User
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
