export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

// Credenciales de prueba
const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'user@test.com',
    password: 'password123',
    name: 'Alex Mercer',
    role: 'user',
  },
  {
    id: '2',
    email: 'admin@test.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
];

const STORAGE_KEY = 'lms_auth';

export const mockAuth = {
  login: (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500); // Simula delay de red
    });
  },

  register: (name: string, email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verificar si el email ya existe
        if (MOCK_USERS.some((u) => u.email === email)) {
          reject(new Error('Email already exists'));
          return;
        }

        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          role: 'user',
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
        resolve(newUser);
      }, 500);
    });
  },

  logout: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  isAuthenticated: (): boolean => {
    return mockAuth.getCurrentUser() !== null;
  },
};

