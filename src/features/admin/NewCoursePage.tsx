"use client";

import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';
import ThemeToggle from '@/components/ThemeToggle';
import { HiInformationCircle } from 'react-icons/hi';

export default function NewCoursePage() {
    const steps = [
        { id: 1, name: 'Course Details', active: true },
        { id: 2, name: 'Syllabus & Content', active: false },
        { id: 3, name: 'Instructors & Enrollment', active: false },
    ];

    const tags: string[] = [];

    return (
        <div 
            className="min-h-screen flex"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            <AdminSidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                Create New Course
                            </h1>
                            <p style={{ color: 'var(--text-secondary)' }}>Fill in the course details below.</p>
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
                        <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
                            Course Details
                        </h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                                        Course Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter course title"
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
                                        Versioning Tag
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., v1.0"
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
                                    Course Description
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Enter course description"
                                    className="w-full rounded-lg px-4 py-3 focus:outline-none resize-none transition-all"
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
                                    Categories / Tags
                                </label>
                                <div 
                                    className="flex flex-wrap gap-2 p-4 rounded-lg min-h-[60px]"
                                    style={{
                                        backgroundColor: 'var(--bg-primary)',
                                        borderColor: 'var(--border)',
                                        border: '1px solid',
                                    }}
                                >
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                                            style={{
                                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                                color: 'var(--accent)',
                                            }}
                                        >
                                            {tag}
                                            <button className="hover:opacity-70">×</button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        placeholder="Add a new tag..."
                                        className="flex-1 bg-transparent border-none outline-none min-w-[150px]"
                                        style={{ color: 'var(--text-primary)' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                                    Course Thumbnail
                                </label>
                                <div 
                                    className="border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer hover:opacity-80"
                                    style={{
                                        borderColor: 'var(--border)',
                                        backgroundColor: 'var(--bg-primary)',
                                    }}
                                >
                                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-secondary)' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        PNG, JPG or GIF (MAX. 800x400px)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-4">
                        <Link
                            href="/admin/admin-courses"
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
                            Create Course
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
