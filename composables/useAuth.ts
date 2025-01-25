import { useAuthUser } from "./useAuthUser";
import { authService } from '~/services/auth';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Base URL

export const useAuth = () => {
  const authUser = useAuthUser();

  const setUser = (user: any) => {
    authUser.value = user;
  };

  const getStoredUser = () => {
    if (process.client) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch {
          return null;
        }
      }
    }
    return null;
  };

  const setStoredUser = (userData: any) => {
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const removeStoredUser = () => {
    if (process.client) {
      localStorage.removeItem('user');
    }
  };

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const response = await authService.login(email, password);
      if (response.token) {
        setStoredUser(response);
        setUser(response.user);
      }
      return authUser;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, type: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        email,
        password,
        type
      });

      if (response.data.token) {
        setStoredUser(response.data);
        setUser(response.data.user);
      }

      return authUser;
    } catch (error: any) {
      throw error.response?.data?.error || 'Signup failed';
    }
  };

  const logout = async () => {
    removeStoredUser();
    setUser(null);
  };

  const me = () => {
    const userData = getStoredUser();
    if (userData?.user) {
      setUser(userData.user);
      return authUser;
    }
    return null;
  };

  return {
    login,
    logout,
    me,
    signup
  };
};
