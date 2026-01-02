"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import { useCourses } from "@/hooks/useCourses";
import { useEnrollments } from "@/hooks/useEnrollments";
import { useAuth } from "@/contexts/AuthContext";
import UserSidebar from "@/components/UserSidebar";
import type { Course } from "@/lib/types";

interface UserCoursePageProps {
    courseId: string;
}

export default function UserCoursePage({ courseId }: UserCoursePageProps) {
    const router = useRouter();
    const { user } = useAuth();
    const { getCourse } = useCourses();
    const { enrollInCourse, isEnrolled } = useEnrollments(user?.id);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [enrolling, setEnrolling] = useState(false);

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

    const handleEnroll = async () => {
        if (!user || !course) return;
        
        if (isEnrolled(user.id, courseId)) {
            router.push(`/user/user-my-courses/${courseId}`);
            return;
        }

        try {
            setEnrolling(true);
            await enrollInCourse(user.id, courseId);
            router.push(`/user/user-my-courses/${courseId}`);
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to enroll in course');
        } finally {
            setEnrolling(false);
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
                    <button onClick={() => router.push('/user/user-courses')} className="mt-4 text-blue-500">
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    const enrolled = user ? isEnrolled(user.id, courseId) : false;

    return (
        <div 
            className="min-h-screen flex"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            <UserSidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{course.title}</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>by {course.instructor}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2">
                        <div 
                            className="rounded-lg p-6 border mb-6"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border)',
                            }}
                        >
                            <div 
                                className="aspect-video rounded-lg mb-4 flex items-center justify-center"
                                style={{ backgroundColor: 'var(--bg-tertiary)' }}
                            >
                                <BsPlayCircleFill className="w-16 h-16" style={{ color: 'var(--text-secondary)' }} />
                            </div>
                            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Course Description</h2>
                            <p className="leading-relaxed mb-6" style={{ color: 'var(--text-primary)' }}>{course.description}</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Duration</p>
                                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{course.duration}</p>
                                </div>
                                <div>
                                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Level</p>
                                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{course.level}</p>
                                </div>
                                <div>
                                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Students</p>
                                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{course.students.toLocaleString()}</p>
                                </div>
                            </div>
                            {course.tags.length > 0 && (
                                <div className="mt-4 flex gap-2 flex-wrap">
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
                            )}
                        </div>
                    </div>

                    <div>
                        <div 
                            className="rounded-lg p-6 border sticky top-8"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border)',
                            }}
                        >
                            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Course Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Instructor</p>
                                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{course.instructor}</p>
                                </div>
                                <div>
                                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Duration</p>
                                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{course.duration}</p>
                                </div>
                                <div>
                                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Level</p>
                                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{course.level}</p>
                                </div>
                                <div>
                                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Status</p>
                                    <p className="font-medium capitalize" style={{ color: 'var(--text-primary)' }}>{course.status}</p>
                                </div>
                            </div>
                            <button 
                                onClick={handleEnroll}
                                disabled={enrolling}
                                className="w-full mt-6 py-3 rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50"
                                style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                            >
                                {enrolling ? 'Enrolling...' : enrolled ? 'Go to Course' : 'Enroll Now'}
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </main>
        </div>
    );
}


