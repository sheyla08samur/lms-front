"use client";

import { useParams } from 'next/navigation';
import AdminUserDetailsPage from "@/features/admin/AdminUserDetailsPage";

export default function Page() {
    const params = useParams();
    const userId = params.userId as string;
    
    return <AdminUserDetailsPage userId={userId} />;
}