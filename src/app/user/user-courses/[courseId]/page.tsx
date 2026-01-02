"use client";

import { useParams } from 'next/navigation';
import UserCoursePage from "@/features/user/UserCourses/UserCoursePage";

export default function Page() {
    const params = useParams();
    const courseId = params.courseId as string;
    
    return <UserCoursePage courseId={courseId} />;
}