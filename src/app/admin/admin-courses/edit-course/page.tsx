"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EditCoursePage from "@/features/admin/EditCoursePage";

function EditCoursePageWrapper() {
    const searchParams = useSearchParams();
    const courseId = searchParams.get('id');
    
    return <EditCoursePage courseId={courseId || undefined} />;
}

export default function Page() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: 'var(--accent)' }} />
                    <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
                </div>
            </div>
        }>
            <EditCoursePageWrapper />
        </Suspense>
    );
}