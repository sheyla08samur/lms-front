"use client";

import Link from "next/link";
import { HiExclamationCircle, HiHome, HiRefresh } from "react-icons/hi";
import { HiAcademicCap } from "react-icons/hi";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <div className="w-full max-w-2xl">
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

                {/* Error Card */}
                <div 
                    className="rounded-2xl p-8 backdrop-blur-sm shadow-2xl border"
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border)',
                    }}
                >
                    <div className="text-center mb-6">
                        <div 
                            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                            style={{ backgroundColor: 'var(--error)', opacity: 0.2 }}
                        >
                            <HiExclamationCircle 
                                className="w-12 h-12"
                                style={{ color: 'var(--error)' }}
                            />
                        </div>
                        <h2 
                            className="text-3xl font-bold mb-2"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Something went wrong!
                        </h2>
                        <p 
                            className="mb-4"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            We encountered an unexpected error. Don't worry, our team has been notified.
                        </p>
                    </div>

                    {/* Error Details */}
                    {process.env.NODE_ENV === 'development' && error.message && (
                        <div 
                            className="rounded-lg p-4 mb-6 border"
                            style={{
                                backgroundColor: 'var(--bg-primary)',
                                borderColor: 'var(--error)',
                                opacity: 0.2,
                            }}
                        >
                            <p 
                                className="text-xs font-mono break-all"
                                style={{ color: 'var(--error)' }}
                            >
                                {error.message}
                            </p>
                            {error.digest && (
                                <p 
                                    className="text-xs mt-2"
                                    style={{ color: 'var(--text-tertiary)' }}
                                >
                                    Error ID: {error.digest}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={reset}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                        >
                            <HiRefresh className="w-5 h-5" />
                            Try Again
                        </button>
                        <Link
                            href="/home"
                            className="flex items-center justify-center gap-2 border px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:opacity-80"
                            style={{ 
                                borderColor: 'var(--border)',
                                color: 'var(--text-primary)',
                            }}
                        >
                            <HiHome className="w-5 h-5" />
                            Go Home
                        </Link>
                    </div>

                    {/* Additional Help */}
                    <div 
                        className="mt-8 pt-6 border-t text-center"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        <p 
                            className="text-sm mb-2"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            Need help? Contact our support team
                        </p>
                        <Link
                            href="/home"
                            className="text-sm font-medium transition-colors hover:underline"
                            style={{ color: 'var(--accent)' }}
                        >
                            Get Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}