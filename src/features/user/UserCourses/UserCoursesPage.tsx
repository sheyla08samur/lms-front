"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiSearch } from "react-icons/hi";
import { useCourses } from "@/hooks/useCourses";
import { useEnrollments } from "@/hooks/useEnrollments";
import { useAuth } from "@/contexts/AuthContext";
import UserSidebar from "@/components/UserSidebar";
import type { Course } from "@/lib/types";

export default function UserCoursesPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { courses, loading } = useCourses();
    const { enrollments, enrollInCourse, isEnrolled } = useEnrollments(user?.id);
    const [searchTerm, setSearchTerm] = useState("");
    const [enrollingId, setEnrollingId] = useState<string | null>(null);

    const handleEnroll = async (courseId: string) => {
        if (!user) return;
        
        try {
            setEnrollingId(courseId);
            await enrollInCourse(user.id, courseId);
            router.push(`/user/user-my-courses/${courseId}`);
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to enroll in course');
        } finally {
            setEnrollingId(null);
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesSearch;
    });

    const getEnrollmentProgress = (courseId: string) => {
        const enrollment = enrollments.find(e => e.courseId === courseId);
        return enrollment ? enrollment.progress : 0;
    };

    return (
        <div 
            className="min-h-screen flex"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            <UserSidebar />
            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="mb-6">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Explore Courses</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
                        </p>
                    </div>
                    <div className="relative max-w-md">
                        <HiSearch 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                            style={{ color: 'var(--text-secondary)' }}
                        />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for courses..."
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
                </div>

                {loading && (
                    <div className="text-center py-12">
                        <div 
                            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                            style={{ borderColor: 'var(--accent)' }}
                        />
                        <p style={{ color: 'var(--text-secondary)' }}>Loading courses...</p>
                    </div>
                )}

                {/* Course Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {filteredCourses.length === 0 ? (
                            <div className="col-span-full text-center py-12" style={{ color: 'var(--text-secondary)' }}>
                                No courses found
                            </div>
                        ) : (
                            filteredCourses.map((course) => {
                                const progress = getEnrollmentProgress(course.id);
                                const enrolled = isEnrolled(user?.id || '', course.id);
                                
                                return (
                                    <div 
                                        key={course.id} 
                                        className="rounded-lg overflow-hidden border transition-colors hover:opacity-90 cursor-pointer"
                                        style={{
                                            backgroundColor: 'var(--bg-secondary)',
                                            borderColor: 'var(--border)',
                                        }}
                                        onClick={() => router.push(`/user/user-courses/${course.id}`)}
                                    >
                                        <div 
                                            className="h-40"
                                            style={{ 
                                                background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
                                            }}
                                        />
                                        <div className="p-4">
                                            <div className="flex gap-2 mb-2 flex-wrap">
                                                {course.tags.slice(0, 2).map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 rounded text-xs font-medium"
                                                        style={{
                                                            backgroundColor: index === 0 
                                                                ? 'rgba(59, 130, 246, 0.2)' 
                                                                : 'rgba(34, 197, 94, 0.2)',
                                                            color: index === 0 ? 'var(--accent)' : 'var(--success)',
                                                        }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                                                {course.title}
                                            </h3>
                                            <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                                                {course.instructor}
                                            </p>
                                            {enrolled && progress > 0 ? (
                                                <>
                                                    <div className="mb-3">
                                                        <div 
                                                            className="w-full rounded-full h-2 mb-1"
                                                            style={{ backgroundColor: 'var(--bg-tertiary)' }}
                                                        >
                                                            <div
                                                                className="h-2 rounded-full transition-all"
                                                                style={{ 
                                                                    width: `${progress}%`,
                                                                    backgroundColor: 'var(--accent)',
                                                                }}
                                                            />
                                                        </div>
                                                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                                            {progress}% Complete
                                                        </p>
                                                    </div>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            router.push(`/user/user-my-courses/${course.id}`);
                                                        }}
                                                        className="w-full py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
                                                        style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                                                    >
                                                        Continue Learning
                                                    </button>
                                                </>
                                            ) : (
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEnroll(course.id);
                                                    }}
                                                    disabled={enrollingId === course.id}
                                                    className="w-full py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50"
                                                    style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                                                >
                                                    {enrollingId === course.id ? 'Enrolling...' : enrolled ? 'View Course' : 'Enroll Now'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}

            </main>
        </div>
    );
}

