"use client";

import { useState, useEffect, useCallback } from 'react';
import { coursesApi } from '@/lib/api';
import type { Course, CreateCourseDto, UpdateCourseDto } from '@/lib/types';

interface UseCoursesReturn {
  courses: Course[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  getCourse: (id: string) => Promise<Course | null>;
  createCourse: (data: CreateCourseDto) => Promise<Course>;
  updateCourse: (data: UpdateCourseDto) => Promise<Course>;
  deleteCourse: (id: string) => Promise<void>;
}

export function useCourses(): UseCoursesReturn {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await coursesApi.getAll();
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  }, []);

  const getCourse = useCallback(async (id: string): Promise<Course | null> => {
    try {
      setError(null);
      return await coursesApi.getById(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch course');
      return null;
    }
  }, []);

  const createCourse = useCallback(async (data: CreateCourseDto): Promise<Course> => {
    try {
      setError(null);
      const newCourse = await coursesApi.create(data);
      await fetchCourses(); // Refresh list
      return newCourse;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create course';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [fetchCourses]);

  const updateCourse = useCallback(async (data: UpdateCourseDto): Promise<Course> => {
    try {
      setError(null);
      const updatedCourse = await coursesApi.update(data);
      await fetchCourses(); // Refresh list
      return updatedCourse;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update course';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [fetchCourses]);

  const deleteCourse = useCallback(async (id: string): Promise<void> => {
    try {
      setError(null);
      await coursesApi.delete(id);
      await fetchCourses(); // Refresh list
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete course';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [fetchCourses]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}

