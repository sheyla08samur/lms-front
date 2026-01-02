"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HiArrowUp, HiArrowDown, HiDownload
} from 'react-icons/hi';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminDashboardPage() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const metrics = [
        { label: 'Active Learners', value: '1,482', change: '+5.2%', trend: 'up' },
        { label: 'Course Completion Rate', value: '76%', change: '+1.8%', trend: 'up' },
        { label: 'Average Score', value: '88.2%', change: '-0.5%', trend: 'down' },
        { label: 'Time Spent Learning', value: '42.5 hrs', change: '+12%', trend: 'up' },
    ];

    const activityData = [
        { week: 'WEEK 1', value: 320 },
        { week: 'WEEK 2', value: 450 },
        { week: 'WEEK 3', value: 380 },
        { week: 'WEEK 4', value: 520 },
    ];

    const courseStatus = [
        { label: 'Completed', percentage: 60, color: 'var(--accent-light)' },
        { label: 'In Progress', percentage: 25, color: 'var(--accent)' },
        { label: 'Not Started', percentage: 15, color: 'var(--success)' },
    ];

    const difficultQuestions = [
        { question: 'What is the primary function of a constructor?', course: 'Intro to Object-Oriented Programming', incorrectRate: '82%', attempts: 1204 },
        { question: "Explain the concept of 'hoisting' in JavaScript.", course: 'Advanced JavaScript Techniques', incorrectRate: '75%', attempts: 987 },
        { question: 'What is the difference between a list and a tuple in Python?', course: 'Python for Data Science', incorrectRate: '68%', attempts: 1530 },
        { question: 'Describe the CSS box model.', course: 'Web Development Fundamentals', incorrectRate: '61%', attempts: 2110 },
    ];

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div 
            className="min-h-screen flex"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            <AdminSidebar />
            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto" style={{ backgroundColor: 'var(--bg-primary)' }}>
                {/* Header */}
                <div className="mb-8 flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                            Analytics & Reports
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            View key metrics and learner performance across all courses.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <select 
                            className="rounded-lg px-4 py-2 focus:outline-none transition-all"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                borderColor: 'var(--border)',
                                border: '1px solid',
                            }}
                        >
                            <option>Last 30 Days</option>
                            <option>Last 7 Days</option>
                            <option>Last 90 Days</option>
                        </select>
                        <button 
                            className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                        >
                            <HiDownload className="w-5 h-5" />
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {metrics.map((metric, index) => (
                        <div 
                            key={index} 
                            className="rounded-lg p-6 border transition-all duration-200 hover:shadow-lg"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border)',
                            }}
                        >
                            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                                {metric.label}
                            </p>
                            <div className="flex items-baseline justify-between">
                                <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                    {metric.value}
                                </h3>
                                <div 
                                    className={`flex items-center gap-1 text-sm ${
                                        metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                                    }`}
                                >
                                    {metric.trend === 'up' ? (
                                        <HiArrowUp className="w-4 h-4" />
                                    ) : (
                                        <HiArrowDown className="w-4 h-4" />
                                    )}
                                    {metric.change}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Learner Activity Chart */}
                    <div 
                        className="rounded-lg p-6 border"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                            Learner Activity Over Time
                        </h3>
                        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                            Activities in the last 30 days
                        </p>
                        <div className="h-64 flex items-end justify-between gap-4">
                            {activityData.map((item, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div 
                                        className="w-full rounded-t-lg mb-2 transition-all hover:opacity-80 cursor-pointer"
                                        style={{ 
                                            height: `${(item.value / 600) * 100}%`,
                                            backgroundColor: 'var(--accent)',
                                        }}
                                    />
                                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                        {item.week}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Course Status Donut */}
                    <div 
                        className="rounded-lg p-6 border"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                            Course Status
                        </h3>
                        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                            Breakdown of all enrollments
                        </p>
                        <div className="flex items-center justify-center">
                            <div className="relative w-48 h-48">
                                <svg className="transform -rotate-90 w-48 h-48">
                                    <circle 
                                        cx="96" 
                                        cy="96" 
                                        r="80" 
                                        strokeWidth="32" 
                                        fill="none"
                                        style={{ stroke: 'var(--bg-tertiary)' }}
                                    />
                                    <circle 
                                        cx="96" 
                                        cy="96" 
                                        r="80" 
                                        strokeWidth="32" 
                                        fill="none"
                                        strokeDasharray={`${2 * Math.PI * 80 * 0.6} ${2 * Math.PI * 80}`}
                                        style={{ stroke: courseStatus[0].color }}
                                    />
                                    <circle 
                                        cx="96" 
                                        cy="96" 
                                        r="80" 
                                        strokeWidth="32" 
                                        fill="none"
                                        strokeDasharray={`${2 * Math.PI * 80 * 0.25} ${2 * Math.PI * 80}`}
                                        strokeDashoffset={-2 * Math.PI * 80 * 0.6}
                                        style={{ stroke: courseStatus[1].color }}
                                    />
                                    <circle 
                                        cx="96" 
                                        cy="96" 
                                        r="80" 
                                        strokeWidth="32" 
                                        fill="none"
                                        strokeDasharray={`${2 * Math.PI * 80 * 0.15} ${2 * Math.PI * 80}`}
                                        strokeDashoffset={-2 * Math.PI * 80 * 0.85}
                                        style={{ stroke: courseStatus[2].color }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                            5,281
                                        </p>
                                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                            Learners
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 space-y-2">
                            {courseStatus.map((status, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div 
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: status.color }}
                                        />
                                        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                                            {status.label}
                                        </span>
                                    </div>
                                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                                        {status.percentage}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Difficult Questions Table */}
                <div 
                    className="rounded-lg border overflow-hidden"
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border)',
                    }}
                >
                    <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
                        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                            Most Difficult Questions
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                        QUESTION
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                        COURSE
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                        INCORRECT RATE
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                        ATTEMPTS
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {difficultQuestions.map((item, index) => (
                                    <tr 
                                        key={index} 
                                        className="border-b transition-colors hover:opacity-80"
                                        style={{ 
                                            borderColor: 'var(--border)',
                                        }}
                                    >
                                        <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-primary)' }}>
                                            {item.question}
                                        </td>
                                        <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                            {item.course}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold" style={{ color: 'var(--error)' }}>
                                            {item.incorrectRate}
                                        </td>
                                        <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-primary)' }}>
                                            {item.attempts.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
