"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import { useCourses } from "@/hooks/useCourses";
import { useEnrollments } from "@/hooks/useEnrollments";
import { useAuth } from "@/contexts/AuthContext";
import UserSidebar from "@/components/UserSidebar";
import type { Course, Enrollment } from "@/lib/types";

interface MyCoursePageProps {
    courseId: string;
}

export default function MyCoursePage({ courseId }: MyCoursePageProps) {
    const router = useRouter();
    const { user } = useAuth();
    const { getCourse } = useCourses();
    const { enrollments, getEnrollment, updateProgress } = useEnrollments(user?.id);
    const [course, setCourse] = useState<Course | null>(null);
    const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadCourse();
    }, [courseId, user]);

    useEffect(() => {
        if (user && enrollments.length > 0) {
            const enrollmentData = getEnrollment(user.id, courseId);
            setEnrollment(enrollmentData || null);
        }
    }, [user, courseId, enrollments, getEnrollment]);

    const loadCourse = async () => {
        try {
            setLoading(true);
            const courseData = await getCourse(courseId);
            setCourse(courseData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load course');
        } finally {
            setLoading(false);
        }
    };

    const handleProgressUpdate = async (newProgress: number) => {
        if (!enrollment || !user) return;
        
        try {
            const updated = await updateProgress(enrollment.id, newProgress);
            setEnrollment(updated);
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to update progress');
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
                    <button onClick={() => router.push('/user/user-my-courses')} className="mt-4 text-blue-500">
                        Back to My Courses
                    </button>
                </div>
            </div>
        );
    }

    const progress = enrollment?.progress || 0;

    return (
        <div 
            className="min-h-screen flex"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            <UserSidebar />
            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>{course.title}</h1>
                    
                    {/* Video Player */}
                    <div 
                        className="rounded-lg overflow-hidden border mb-6"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <div 
                            className="aspect-video flex items-center justify-center"
                            style={{ backgroundColor: 'var(--bg-tertiary)' }}
                        >
                            <BsPlayCircleFill className="w-20 h-20" style={{ color: 'var(--text-secondary)' }} />
                        </div>
                    </div>

                    <div 
                        className="rounded-lg p-6 mb-6"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                            border: '1px solid',
                        }}
                    >
                        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Course Description</h2>
                        <p className="leading-relaxed mb-4" style={{ color: 'var(--text-primary)' }}>{course.description}</p>
                        <div className="flex gap-2 flex-wrap">
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

                    {/* Progress Update Button (Demo) */}
                    <div className="flex gap-4 mb-8">
                        <button 
                            onClick={() => handleProgressUpdate(Math.min(100, progress + 10))}
                            disabled={progress >= 100}
                            className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50"
                            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                        >
                            Mark Progress +10%
                        </button>
                    </div>

                    {/* Progress Section */}
                    <div 
                        className="rounded-lg p-6 border"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Course Progress</h3>
                        <div className="flex items-center justify-center mb-4">
                            <div className="relative w-24 h-24">
                                <svg className="transform -rotate-90 w-24 h-24">
                                    <circle 
                                        cx="48" 
                                        cy="48" 
                                        r="44" 
                                        strokeWidth="8" 
                                        fill="none"
                                        style={{ stroke: 'var(--bg-tertiary)' }}
                                    />
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="44"
                                        strokeWidth="8"
                                        fill="none"
                                        style={{ 
                                            stroke: 'var(--accent)',
                                            strokeDasharray: `${2 * Math.PI * 44 * (progress / 100)} ${2 * Math.PI * 44}`,
                                        }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{progress}%</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-center font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                            {progress >= 100 ? 'Course Completed!' : 'Keep Learning!'}
                        </p>
                        <p className="text-center text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                            {progress}% Complete
                        </p>

                        <div className="space-y-3">
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
                        </div>
                    </div>
                </div>
                </div>
            </main>
        </div>
    );
}

