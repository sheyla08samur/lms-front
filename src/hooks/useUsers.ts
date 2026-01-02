"use client";

import { useState, useEffect, useCallback } from 'react';
import { usersApi } from '@/lib/api';
import type { User, CreateUserDto, UpdateUserDto } from '@/lib/types';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  getUser: (id: string) => Promise<User | null>;
  createUser: (data: CreateUserDto) => Promise<User>;
  updateUser: (data: UpdateUserDto) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  const getUser = useCallback(async (id: string): Promise<User | null> => {
    try {
      setError(null);
      return await usersApi.getById(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
      return null;
    }
  }, []);

  const createUser = useCallback(async (data: CreateUserDto): Promise<User> => {
    try {
      setError(null);
      const newUser = await usersApi.create(data);
      await fetchUsers(); // Refresh list
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [fetchUsers]);

  const updateUser = useCallback(async (data: UpdateUserDto): Promise<User> => {
    try {
      setError(null);
      const updatedUser = await usersApi.update(data);
      await fetchUsers(); // Refresh list
      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [fetchUsers]);

  const deleteUser = useCallback(async (id: string): Promise<void> => {
    try {
      setError(null);
      await usersApi.delete(id);
      await fetchUsers(); // Refresh list
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [fetchUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };
}

