import type {
  User,
  Course,
  Enrollment,
  CreateCourseDto,
  UpdateCourseDto,
  CreateUserDto,
  UpdateUserDto,
  LoginDto,
  RegisterDto,
  AuthResponse,
  ApiError,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Helper para obtener token de autenticación
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

// Helper para hacer requests
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      error: 'An error occurred',
    }));
    throw new Error(error.error || 'An error occurred');
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Guardar token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
    }
    
    return response;
  },

  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Guardar token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
    }
    
    return response;
  },

  logout: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  },

  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  },
};

// Courses API
export const coursesApi = {
  getAll: async (): Promise<Course[]> => {
    return request<Course[]>('/courses');
  },

  getById: async (id: string): Promise<Course> => {
    return request<Course>(`/courses/${id}`);
  },

  create: async (data: CreateCourseDto): Promise<Course> => {
    const courseData = {
      ...data,
      status: data.status || 'Draft',
      tags: data.tags || [],
      thumbnail: data.thumbnail || '',
      students: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return request<Course>('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  },

  update: async (data: UpdateCourseDto): Promise<Course> => {
    const { id, ...updateData } = data;
    const courseData = {
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    return request<Course>(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
  },

  delete: async (id: string): Promise<void> => {
    return request<void>(`/courses/${id}`, {
      method: 'DELETE',
    });
  },
};

// Users API
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const users = await request<Array<User & { password?: string }>>('/users');
    // Remover passwords de la respuesta
    return users.map(({ password, ...user }) => user);
  },

  getById: async (id: string): Promise<User> => {
    const user = await request<User & { password?: string }>(`/users/${id}`);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  create: async (data: CreateUserDto): Promise<User> => {
    const userData = {
      ...data,
      role: data.role || 'user',
      createdAt: new Date().toISOString(),
    };
    const user = await request<User & { password?: string }>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  update: async (data: UpdateUserDto): Promise<User> => {
    const { id, ...updateData } = data;
    const user = await request<User & { password?: string }>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  delete: async (id: string): Promise<void> => {
    return request<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// Enrollments API
export const enrollmentsApi = {
  getAll: async (): Promise<Enrollment[]> => {
    return request<Enrollment[]>('/enrollments');
  },

  getByUserId: async (userId: string): Promise<Enrollment[]> => {
    return request<Enrollment[]>(`/enrollments?userId=${userId}`);
  },

  getByCourseId: async (courseId: string): Promise<Enrollment[]> => {
    return request<Enrollment[]>(`/enrollments?courseId=${courseId}`);
  },

  getById: async (id: string): Promise<Enrollment> => {
    return request<Enrollment>(`/enrollments/${id}`);
  },

  enroll: async (userId: string, courseId: string): Promise<Enrollment> => {
    // Verificar si ya está inscrito
    const existing = await enrollmentsApi.getByUserId(userId);
    const alreadyEnrolled = existing.find(e => e.courseId === courseId);
    
    if (alreadyEnrolled) {
      throw new Error('Already enrolled in this course');
    }

    const enrollmentData = {
      userId,
      courseId,
      progress: 0,
      enrolledAt: new Date().toISOString(),
      completedAt: null,
    };

    return request<Enrollment>('/enrollments', {
      method: 'POST',
      body: JSON.stringify(enrollmentData),
    });
  },

  updateProgress: async (
    id: string,
    progress: number
  ): Promise<Enrollment> => {
    const enrollment = await enrollmentsApi.getById(id);
    const updateData = {
      ...enrollment,
      progress: Math.min(100, Math.max(0, progress)),
      completedAt: progress >= 100 ? new Date().toISOString() : enrollment.completedAt,
    };

    return request<Enrollment>(`/enrollments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  delete: async (id: string): Promise<void> => {
    return request<void>(`/enrollments/${id}`, {
      method: 'DELETE',
    });
  },
};

