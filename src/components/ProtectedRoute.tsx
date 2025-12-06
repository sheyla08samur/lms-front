"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                router.push('/auth/login');
                return;
            }

            if (requireAdmin && user?.role !== 'admin') {
                // Si es user intentando acceder a ruta admin, redirigir a su dashboard
                router.push('/user/user-dashboard');
                return;
            }
            
            // Si es admin pero está en ruta user, permitir acceso (admin puede ver user pages)
            // No hacer nada, permitir el acceso
        }
    }, [user, loading, isAuthenticated, requireAdmin, router]);

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

    if (!isAuthenticated) {
        return null;
    }

    if (requireAdmin && user?.role !== 'admin') {
        return null;
    }

    return <>{children}</>;
}

