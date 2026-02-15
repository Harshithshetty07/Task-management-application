// Storage keys constants
const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
} as const;

// Storage utility functions for localStorage
export const storage = {
  // Save token to localStorage
  setToken: (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  // Get token from localStorage
  getToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  // Remove token from localStorage
  removeToken: (): void => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  // Save user data to localStorage
  setUser: (user: any): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  // Get user data from localStorage
  getUser: (): any => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  // Remove user data from localStorage
  removeUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Clear all storage
  clear: (): void => {
    localStorage.clear();
  },
};