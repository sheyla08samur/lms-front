"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import ThemeToggle from '@/components/ThemeToggle';
import { useCourses } from '@/hooks/useCourses';
import type { CreateCourseDto } from '@/lib/types';

export default function NewCoursePage() {
    const router = useRouter();
    const { createCourse } = useCourses();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [formData, setFormData] = useState<CreateCourseDto>({
        title: '',
        description: '',
        instructor: '',
        duration: '',
        level: 'Beginner',
        status: 'Draft',
        tags: [],
        thumbnail: '',
    });
    
    const [tagInput, setTagInput] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            if (!formData.title.trim() || !formData.description.trim() || !formData.instructor.trim()) {
                throw new Error('Please fill in all required fields');
            }

            const course = await createCourse(formData);
            router.push(`/admin/admin-courses/${course.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create course');
        } finally {
            setSubmitting(false);
        }
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...(formData.tags || []), tagInput.trim()],
            });
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData({
            ...formData,
            tags: formData.tags?.filter(tag => tag !== tagToRemove) || [],
        });
    };

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
                            <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
                                Course Details
                            </h2>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                                            Course Title *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                                            Duration *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            placeholder="e.g., 8 weeks"
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
                                        Instructor *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.instructor}
                                        onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                                        placeholder="Enter instructor name"
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
                                        Course Description *
                                    </label>
                                    <textarea
                                        rows={5}
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                                            Level *
                                        </label>
                                        <select
                                            required
                                            value={formData.level}
                                            onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                                            className="w-full rounded-lg px-4 py-3 focus:outline-none transition-all"
                                            style={{
                                                backgroundColor: 'var(--bg-primary)',
                                                color: 'var(--text-primary)',
                                                borderColor: 'var(--border)',
                                                border: '1px solid',
                                            }}
                                        >
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                                            Status
                                        </label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                            className="w-full rounded-lg px-4 py-3 focus:outline-none transition-all"
                                            style={{
                                                backgroundColor: 'var(--bg-primary)',
                                                color: 'var(--text-primary)',
                                                borderColor: 'var(--border)',
                                                border: '1px solid',
                                            }}
                                        >
                                            <option value="Draft">Draft</option>
                                            <option value="Published">Published</option>
                                        </select>
                                    </div>
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
                                        {formData.tags?.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                                                style={{
                                                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                                    color: 'var(--accent)',
                                                }}
                                            >
                                                {tag}
                                                <button 
                                                    type="button"
                                                    onClick={() => removeTag(tag)}
                                                    className="hover:opacity-70"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                        <input
                                            type="text"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    addTag();
                                                }
                                            }}
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
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                                style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                            >
                                {submitting ? 'Creating...' : 'Create Course'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
