"use client";

import { useRouter } from "next/navigation";
import { useEnrollments } from "@/hooks/useEnrollments";
import { useAuth } from "@/contexts/AuthContext";
import UserSidebar from "@/components/UserSidebar";
import type { Enrollment } from "@/lib/types";

export default function UserMyCoursesPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { enrollments, loading } = useEnrollments(user?.id);

    return (
        <div 
            className="min-h-screen flex"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            <UserSidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>My Courses</h1>
                
                {loading && (
                    <div className="text-center py-12">
                        <div 
                            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                            style={{ borderColor: 'var(--accent)' }}
                        />
                        <p style={{ color: 'var(--text-secondary)' }}>Loading your courses...</p>
                    </div>
                )}

                {!loading && enrollments.length === 0 && (
                    <div className="text-center py-12">
                        <p style={{ color: 'var(--text-secondary)' }} className="mb-4">You haven't enrolled in any courses yet.</p>
                        <button
                            onClick={() => router.push('/user/user-courses')}
                            className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                        >
                            Browse Courses
                        </button>
                    </div>
                )}

                {!loading && enrollments.length > 0 && (
                    <div className="space-y-4">
                        {enrollments.map((enrollment) => {
                            const course = enrollment.course;
                            if (!course) return null;

                            return (
                                <div 
                                    key={enrollment.id} 
                                    className="rounded-lg p-6 border transition-colors hover:opacity-90 cursor-pointer"
                                    style={{
                                        backgroundColor: 'var(--bg-secondary)',
                                        borderColor: 'var(--border)',
                                    }}
                                    onClick={() => router.push(`/user/user-my-courses/${course.id}`)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                                {course.title}
                                            </h3>
                                            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                                                {course.instructor}
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1 max-w-xs">
                                                    <div className="flex items-center justify-between text-sm mb-1">
                                                        <span style={{ color: 'var(--text-secondary)' }}>Progress</span>
                                                        <span style={{ color: 'var(--text-primary)' }}>{enrollment.progress}%</span>
                                                    </div>
                                                    <div 
                                                        className="w-full rounded-full h-2"
                                                        style={{ backgroundColor: 'var(--bg-tertiary)' }}
                                                    >
                                                        <div
                                                            className="h-2 rounded-full transition-all"
                                                            style={{ 
                                                                width: `${enrollment.progress}%`,
                                                                backgroundColor: 'var(--accent)',
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                router.push(`/user/user-my-courses/${course.id}`);
                                            }}
                                            className="ml-6 px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                                            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                                        >
                                            Continue Learning
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                </div>
            </main>
        </div>
    );
}

