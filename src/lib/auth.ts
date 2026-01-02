import { authApi } from './api';
import type { User, LoginDto, RegisterDto } from './types';

export { type User } from './types';

export const auth = {
  login: async (email: string, password: string): Promise<User> => {
    try {
      const response = await authApi.login({ email, password });
      return response.user;
    } catch (error) {
      throw error;
    }
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    try {
      const response = await authApi.register({ name, email, password });
      return response.user;
    } catch (error) {
      throw error;
    }
  },

  logout: (): void => {
    authApi.logout();
  },

  getCurrentUser: (): User | null => {
    return authApi.getCurrentUser();
  },

  isAuthenticated: (): boolean => {
    return auth.getCurrentUser() !== null;
  },
};

