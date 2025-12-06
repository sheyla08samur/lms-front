"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaGraduationCap, FaBook, FaChartLine, FaUsers, FaCertificate } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import { BsPlayCircle } from 'react-icons/bs';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function HomePage() {
    const { isAuthenticated, user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            // Redirigir según el rol
            if (user?.role === 'admin') {
                router.push('/admin/admin-dashboard');
            } else {
                router.push('/user/user-dashboard');
            }
        }
    }, [isAuthenticated, loading, user, router]);

    const features = [
        {
            icon: FaBook,
            title: 'Comprehensive Courses',
            description: 'Access a wide range of courses from beginner to advanced levels',
        },
        {
            icon: FaChartLine,
            title: 'Track Your Progress',
            description: 'Monitor your learning journey with detailed analytics and reports',
        },
        {
            icon: FaUsers,
            title: 'Expert Instructors',
            description: 'Learn from industry professionals and subject matter experts',
        },
        {
            icon: FaCertificate,
            title: 'Get Certified',
            description: 'Earn certificates upon course completion to showcase your skills',
        },
    ];

    if (loading) {
        return (
            <div 
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: 'var(--bg-primary)' }}
            >
                <div className="text-center">
                    <div 
                        className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                        style={{ borderColor: 'var(--accent)' }}
                    />
                    <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="min-h-screen"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            {/* Navigation */}
            <nav 
                className="border-b backdrop-blur-sm sticky top-0 z-50"
                style={{ 
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border)',
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/home" className="flex items-center gap-3">
                        <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: 'var(--accent)' }}
                        >
                            <HiAcademicCap className="w-6 h-6 text-white" />
                        </div>
                        <h1 
                            className="text-2xl font-bold"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Breakline Educate
                        </h1>
                    </Link>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    href="/auth/login"
                                    className="transition-colors hover:opacity-80"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                                    style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                                >
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <Link
                                href={user?.role === 'admin' ? '/admin/admin-dashboard' : '/user/user-dashboard'}
                                className="px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:opacity-90"
                                style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 
                        className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent"
                        style={{
                            backgroundImage: 'linear-gradient(to right, var(--accent), var(--accent-light))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Transform Your Learning Journey
                    </h2>
                    <p 
                        className="text-xl max-w-2xl mx-auto mb-8"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Discover, learn, and grow with our comprehensive learning management system.
                        Access expert-led courses, track your progress, and achieve your goals.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link
                            href="/auth/register"
                            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/user/user-courses"
                            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 border hover:opacity-80"
                            style={{ 
                                borderColor: 'var(--border)',
                                color: 'var(--text-primary)',
                            }}
                        >
                            Explore Courses
                        </Link>
                    </div>
                </div>

                {/* Hero Image/Placeholder */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div 
                        className="rounded-2xl p-12 border"
                        style={{
                            background: 'linear-gradient(135deg, var(--accent-light) 0%, transparent 100%)',
                            borderColor: 'var(--border)',
                            backgroundColor: 'var(--bg-secondary)',
                        }}
                    >
                        <div 
                            className="aspect-video rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: 'var(--bg-tertiary)' }}
                        >
                            <BsPlayCircle 
                                className="w-24 h-24 transition-all duration-200 hover:scale-110 cursor-pointer"
                                style={{ color: 'var(--text-secondary)' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section 
                className="max-w-7xl mx-auto px-6 py-20"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                        Why Choose Breakline Educate?
                    </h3>
                    <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Everything you need to succeed in your learning journey
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="rounded-lg p-6 border transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                            style={{
                                backgroundColor: 'var(--bg-primary)',
                                borderColor: 'var(--border)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--accent)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border)';
                            }}
                        >
                            <div className="mb-4">
                                <feature.icon 
                                    className="w-12 h-12"
                                    style={{ color: 'var(--accent)' }}
                                />
                            </div>
                            <h4 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                {feature.title}
                            </h4>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div 
                            className="text-4xl font-bold mb-2"
                            style={{ color: 'var(--accent)' }}
                        >
                            10,000+
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>Active Learners</div>
                    </div>
                    <div className="text-center">
                        <div 
                            className="text-4xl font-bold mb-2"
                            style={{ color: 'var(--accent-light)' }}
                        >
                            500+
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>Courses Available</div>
                    </div>
                    <div className="text-center">
                        <div 
                            className="text-4xl font-bold mb-2"
                            style={{ color: 'var(--success)' }}
                        >
                            200+
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>Expert Instructors</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section 
                className="max-w-7xl mx-auto px-6 py-20 rounded-2xl border mb-20"
                style={{
                    background: 'linear-gradient(135deg, var(--accent-light) 0%, transparent 100%)',
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--bg-secondary)',
                }}
            >
                <div className="text-center">
                    <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                        Ready to Start Learning?
                    </h3>
                    <p className="mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Join thousands of learners who are already advancing their careers with Breakline Educate
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link
                            href="/auth/register"
                            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                        >
                            Create Free Account
                        </Link>
                        <Link
                            href="/auth/login"
                            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 border hover:opacity-80"
                            style={{ 
                                borderColor: 'var(--border)',
                                color: 'var(--text-primary)',
                            }}
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer 
                className="border-t"
                style={{ 
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border)',
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-3 mb-4 md:mb-0">
                            <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: 'var(--accent)' }}
                            >
                                <HiAcademicCap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                                Breakline Educate
                            </span>
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }} className="text-sm">
                            © 2024 Breakline Educate. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
