"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiAcademicCap, HiEye, HiEyeOff } from 'react-icons/hi';
import { FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { SiApple } from 'react-icons/si';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { register, isAuthenticated, user, loading } = useAuth();
    const router = useRouter();

    // Si ya está autenticado, redirigir según el rol
    React.useEffect(() => {
        if (!loading && isAuthenticated && user) {
            if (user.role === 'admin') {
                router.push('/admin/admin-dashboard');
            } else {
                router.push('/user/user-dashboard');
            }
        }
    }, [isAuthenticated, user, loading, router]);

    if (loading || (isAuthenticated && user)) {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setSubmitting(true);

        try {
            await register(name, email, password);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to register');
            setSubmitting(false);
        }
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4 relative"
            style={{
                background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)',
            }}
        >
            {/* Theme Toggle */}
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: 'var(--accent)' }}
                        >
                            <HiAcademicCap className="w-8 h-8 text-white" />
                        </div>
                        <h1 
                            className="text-3xl font-bold"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Breakline Educate
                        </h1>
                    </div>
                </div>

                {/* Register Card */}
                <div 
                    className="rounded-2xl p-8 backdrop-blur-sm shadow-2xl border"
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border)',
                    }}
                >
                    <h2 
                        className="text-2xl font-bold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Create Account
                    </h2>
                    <p 
                        className="mb-6"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Sign up to get started with your learning journey
                    </p>

                    {error && (
                        <div 
                            className="mb-4 p-3 rounded-lg text-sm"
                            style={{
                                backgroundColor: 'var(--error)',
                                color: 'white',
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label 
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                                required
                                className="w-full rounded-lg px-4 py-3 focus:outline-none transition-colors"
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

                        {/* Email */}
                        <div>
                            <label 
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full rounded-lg px-4 py-3 focus:outline-none transition-colors"
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

                        {/* Password */}
                        <div>
                            <label 
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                    required
                                    minLength={6}
                                    className="w-full rounded-lg px-4 py-3 pr-12 focus:outline-none transition-colors"
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
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                                    style={{ color: 'var(--text-secondary)' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = 'var(--text-primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                    }}
                                >
                                    {showPassword ? (
                                        <HiEyeOff className="w-5 h-5" />
                                    ) : (
                                        <HiEye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label 
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                    required
                                    minLength={6}
                                    className="w-full rounded-lg px-4 py-3 pr-12 focus:outline-none transition-colors"
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
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                                    style={{ color: 'var(--text-secondary)' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = 'var(--text-primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                    }}
                                >
                                    {showConfirmPassword ? (
                                        <HiEyeOff className="w-5 h-5" />
                                    ) : (
                                        <HiEye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{
                                backgroundColor: submitting ? 'var(--text-tertiary)' : 'var(--accent)',
                                color: 'white',
                            }}
                            onMouseEnter={(e) => {
                                if (!submitting) {
                                    e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!submitting) {
                                    e.currentTarget.style.backgroundColor = 'var(--accent)';
                                }
                            }}
                        >
                            {submitting ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </form>

                    {/* Social Login */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div 
                                    className="w-full border-t"
                                    style={{ borderColor: 'var(--border)' }}
                                />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span 
                                    className="px-2"
                                    style={{
                                        backgroundColor: 'var(--bg-secondary)',
                                        color: 'var(--text-secondary)',
                                    }}
                                >
                                    Or sign up with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center gap-4">
                            <button 
                                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    border: '1px solid var(--border)',
                                }}
                            >
                                <FaGoogle className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
                            </button>
                            <button 
                                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    border: '1px solid var(--border)',
                                }}
                            >
                                <FaMicrosoft className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
                            </button>
                            <button 
                                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    border: '1px solid var(--border)',
                                }}
                            >
                                <SiApple className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
                            </button>
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Already have an account?{' '}
                            <Link 
                                href="/auth/login" 
                                className="font-medium transition-colors hover:underline"
                                style={{ color: 'var(--accent)' }}
                            >
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
