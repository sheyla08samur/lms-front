"use client";

import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from './AdminSidebar';
import UserSidebar from './UserSidebar';

interface DynamicNavbarProps {
    currentPath?: string;
}

export default function DynamicNavbar({ currentPath }: DynamicNavbarProps) {
    const { user } = useAuth();

    if (user?.role === 'admin') {
        return <AdminSidebar currentPath={currentPath} />;
    }

    return <UserSidebar currentPath={currentPath} />;
}

