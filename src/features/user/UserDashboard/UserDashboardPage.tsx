"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HiHome, HiBookOpen, HiChartBar, HiUserGroup, HiCalendar, HiCog,
    HiSearch, HiBell, HiPlus, HiQuestionMarkCircle, HiDownload, HiLogout
} from 'react-icons/hi';
import { FaCertificate } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import UserSidebar from '@/components/UserSidebar';

export default function UserDashboardPage() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const courses = [
        { id: 1, title: 'Quantum Physics 101', progress: 75, image: 'bg-gradient-to-br from-green-400 to-black' },
        { id: 2, title: 'Advanced AI', progress: 30, image: 'bg-gradient-to-br from-yellow-400 to-black' },
        { id: 3, title: 'Modern Web Development', progress: 95, image: 'bg-gradient-to-br from-blue-400 to-purple-500' },
    ];

    const deadlines = [
        { date: 'DEC 15', title: 'AI Ethics Essay', course: 'Advanced AI' },
        { date: 'DEC 20', title: 'Final Quiz', course: 'Quantum Physics 101' },
    ];

    const communityPosts = [
        { author: 'Jane Doe', course: 'Quantum Physics 101', content: 'Can anyone explain the observer effect?' },
        { author: 'John Smith', course: 'Advanced AI', content: 'Sharing a new paper on transformer models...' },
    ];

    const navItems = [
        { href: '/user/user-dashboard', icon: HiHome, label: 'Dashboard' },
        { href: '/user/user-courses', icon: HiBookOpen, label: 'Courses' },
        { href: '/user/user-my-courses', icon: HiChartBar, label: 'My Courses' },
        { href: '#', icon: HiUserGroup, label: 'Community' },
        { href: '#', icon: HiCalendar, label: 'Calendar' },
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
            <UserSidebar />

            {/* Main Content */}
            <main className="flex-1 p-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
                {/* Top Bar */}
                <div className="mb-8 flex justify-between items-center">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <HiSearch 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                                style={{ color: 'var(--text-secondary)' }}
                            />
                            <input
                                type="text"
                                placeholder="Search for courses, users, or resources..."
                                className="w-full rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 transition-all"
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                    borderColor: 'var(--border)',
                                    border: '1px solid',
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--accent)';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-light)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button className="relative p-2 rounded-lg transition-all hover:bg-bg-secondary">
                            <HiBell 
                                className="w-6 h-6"
                                style={{ color: 'var(--text-secondary)' }}
                            />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-3">
                            <div 
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                                style={{ backgroundColor: 'var(--accent)' }}
                            >
                                {user ? getInitials(user.name) : 'U'}
                            </div>
                            <div>
                                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                    {user?.name || 'User'}
                                </p>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    Student
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                    Here's a snapshot of your learning activities today.
                </p>

                {/* My Courses */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                        My Courses
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <Link
                                key={course.id}
                                href={`/user/user-my-courses/${course.id}`}
                                className="rounded-lg overflow-hidden border transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    borderColor: 'var(--border)',
                                }}
                            >
                                <div className={`h-32 ${course.image}`}></div>
                                <div className="p-4">
                                    <h3 
                                        className="font-semibold mb-2"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {course.title}
                                    </h3>
                                    <div className="mb-2">
                                        <div className="flex items-center justify-between text-sm mb-1">
                                            <span style={{ color: 'var(--text-secondary)' }}>Progress</span>
                                            <span style={{ color: 'var(--text-primary)' }}>{course.progress}%</span>
                                        </div>
                                        <div 
                                            className="w-full rounded-full h-2"
                                            style={{ backgroundColor: 'var(--bg-tertiary)' }}
                                        >
                                            <div
                                                className="h-2 rounded-full transition-all"
                                                style={{ 
                                                    width: `${course.progress}%`,
                                                    backgroundColor: 'var(--accent)',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {course.progress === 95 ? (
                                        <span 
                                            className="text-xs font-medium"
                                            style={{ color: 'var(--success)' }}
                                        >
                                            Complete
                                        </span>
                                    ) : (
                                        <button 
                                            className="w-full mt-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90"
                                            style={{ 
                                                backgroundColor: 'var(--accent)',
                                                color: 'white',
                                            }}
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            Continue Learning
                                        </button>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <div 
                        className="rounded-lg p-6 border"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <Link
                                href="/user/user-courses"
                                className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90"
                                style={{ backgroundColor: 'var(--accent)', color: 'white' }}
                            >
                                <HiPlus className="w-5 h-5" />
                                Browse Courses
                            </Link>
                            <button 
                                className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90"
                                style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}
                            >
                                <HiQuestionMarkCircle className="w-5 h-5" />
                                Start Assessment
                            </button>
                        </div>
                    </div>

                    {/* Upcoming Deadlines */}
                    <div 
                        className="rounded-lg p-6 border"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                            Upcoming Deadlines
                        </h3>
                        <div className="space-y-4">
                            {deadlines.map((deadline, index) => (
                                <div key={index}>
                                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                                        {deadline.date}
                                    </p>
                                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                        {deadline.title}
                                    </p>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        {deadline.course}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress Snapshot */}
                    <div 
                        className="rounded-lg p-6 border"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                            Progress Snapshot
                        </h3>
                        <div className="flex gap-6">
                            <div className="flex-1 text-center">
                                <div className="relative w-20 h-20 mx-auto mb-2">
                                    <svg className="transform -rotate-90 w-20 h-20">
                                        <circle 
                                            cx="40" 
                                            cy="40" 
                                            r="36" 
                                            strokeWidth="8" 
                                            fill="none"
                                            style={{ stroke: 'var(--bg-tertiary)' }}
                                        />
                                        <circle 
                                            cx="40" 
                                            cy="40" 
                                            r="36" 
                                            strokeWidth="8" 
                                            fill="none" 
                                            strokeDasharray={`${2 * Math.PI * 36 * 0.65} ${2 * Math.PI * 36}`}
                                            style={{ stroke: 'var(--success)' }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                            65%
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Overall</p>
                            </div>
                            <div className="flex-1 text-center">
                                <div className="relative w-20 h-20 mx-auto mb-2">
                                    <svg className="transform -rotate-90 w-20 h-20">
                                        <circle 
                                            cx="40" 
                                            cy="40" 
                                            r="36" 
                                            strokeWidth="8" 
                                            fill="none"
                                            style={{ stroke: 'var(--bg-tertiary)' }}
                                        />
                                        <circle 
                                            cx="40" 
                                            cy="40" 
                                            r="36" 
                                            strokeWidth="8" 
                                            fill="none" 
                                            strokeDasharray={`${2 * Math.PI * 36 * 0.85} ${2 * Math.PI * 36}`}
                                            style={{ stroke: 'var(--accent)' }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                            85%
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Mastery</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Community Feed & Certificates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div 
                        className="rounded-lg p-6 border"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                            Community Feed
                        </h3>
                        <div className="space-y-4">
                            {communityPosts.map((post, index) => (
                                <div key={index} className="flex gap-3">
                                    <div 
                                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-semibold"
                                        style={{ backgroundColor: 'var(--accent)' }}
                                    >
                                        {post.author.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                                            {post.author} in {post.course}
                                        </p>
                                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                            {post.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div 
                        className="rounded-lg p-6 border"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--border)',
                        }}
                    >
                        <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                            My Certificates
                        </h3>
                        <div 
                            className="flex items-center gap-4 p-4 rounded-lg"
                            style={{ backgroundColor: 'var(--bg-primary)' }}
                        >
                            <div 
                                className="w-16 h-16 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: 'var(--accent)' }}
                            >
                                <FaCertificate className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                    History Specialist
                                </p>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    Earned on Dec 1, 2023
                                </p>
                            </div>
                            <button 
                                className="transition-colors hover:opacity-70"
                                style={{ color: 'var(--accent)' }}
                            >
                                <HiDownload className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
