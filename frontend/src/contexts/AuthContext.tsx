import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import axios from "../lib/axios";

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'viewer' | 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ user: User }>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const response = await axios.get('/auth/me');
      setUser(response.data);
    } catch (error: any) {
      console.log('Auth check failed:', error.response?.status);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post('/auth/login', {
      email,
      password
    });
    
    setUser(response.data.user);
    return { user: response.data.user };
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null); // Clear user state even if request fails
    }
  };

  const refreshAuth = useCallback(async () => {
    await checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};