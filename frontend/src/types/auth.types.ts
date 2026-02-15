// User type definition
export interface User {
  id: string;
  username: string;
}

// Login credentials type
export interface LoginCredentials {
  username: string;
  password: string;
}

// Authentication response type
export interface AuthResponse {
  token: string;
  user: User;
}

// State type for auth slice
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}