"use client";

import { useParams } from 'next/navigation';
import MyCoursePage from "@/features/user/UserMyCourses/MyCoursePage";

export default function Page() {
    const params = useParams();
    const courseId = params.courseId as string;
    
    return <MyCoursePage courseId={courseId} />;
}