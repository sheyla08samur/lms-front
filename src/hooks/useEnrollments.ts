"use client";

import { useState, useEffect, useCallback } from 'react';
import { enrollmentsApi } from '@/lib/api';
import type { Enrollment } from '@/lib/types';

interface UseEnrollmentsReturn {
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;
  fetchEnrollments: (userId: string) => Promise<void>;
  enrollInCourse: (userId: string, courseId: string) => Promise<Enrollment>;
  updateProgress: (enrollmentId: string, progress: number) => Promise<Enrollment>;
  unenroll: (enrollmentId: string) => Promise<void>;
  isEnrolled: (userId: string, courseId: string) => boolean;
  getEnrollment: (userId: string, courseId: string) => Enrollment | undefined;
}

export function useEnrollments(userId?: string): UseEnrollmentsReturn {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEnrollments = useCallback(async (targetUserId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await enrollmentsApi.getByUserId(targetUserId);
      setEnrollments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch enrollments');
    } finally {
      setLoading(false);
    }
  }, []);

  const enrollInCourse = useCallback(async (targetUserId: string, courseId: string): Promise<Enrollment> => {
    try {
      setError(null);
      const enrollment = await enrollmentsApi.enroll(targetUserId, courseId);
      if (targetUserId === userId) {
        await fetchEnrollments(targetUserId); // Refresh if same user
      }
      return enrollment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to enroll in course';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [userId, fetchEnrollments]);

  const updateProgress = useCallback(async (enrollmentId: string, progress: number): Promise<Enrollment> => {
    try {
      setError(null);
      const updated = await enrollmentsApi.updateProgress(enrollmentId, progress);
      // Update local state
      setEnrollments(prev => 
        prev.map(e => e.id === enrollmentId ? updated : e)
      );
      return updated;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update progress';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const unenroll = useCallback(async (enrollmentId: string): Promise<void> => {
    try {
      setError(null);
      await enrollmentsApi.delete(enrollmentId);
      setEnrollments(prev => prev.filter(e => e.id !== enrollmentId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to unenroll';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const isEnrolled = useCallback((targetUserId: string, courseId: string): boolean => {
    return enrollments.some(
      e => e.userId === targetUserId && e.courseId === courseId
    );
  }, [enrollments]);

  const getEnrollment = useCallback((targetUserId: string, courseId: string): Enrollment | undefined => {
    return enrollments.find(
      e => e.userId === targetUserId && e.courseId === courseId
    );
  }, [enrollments]);

  useEffect(() => {
    if (userId) {
      fetchEnrollments(userId);
    }
  }, [userId, fetchEnrollments]);

  return {
    enrollments,
    loading,
    error,
    fetchEnrollments,
    enrollInCourse,
    updateProgress,
    unenroll,
    isEnrolled,
    getEnrollment,
  };
}

