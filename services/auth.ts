import axios from 'axios';

const API_URL = '/api/auth'; // Using relative URL

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    type: 'ESTABLISHEMENT' | 'PARTICULIER' | 'ADMIN';
    isFinishedOnboarding: boolean;
  };
  token: string;
}

export interface SignupData {
  email: string;
  password: string;
  type: 'ESTABLISHEMENT' | 'PARTICULIER' | 'ADMIN';
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      console.log('Attempting login with email:', email);
      const response = await axios.post(`${API_URL}/signin`, { email, password });
      console.log('Login response:', response.data);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error.response?.data?.error || 'Login failed';
    }
  },

  async signup(data: SignupData): Promise<LoginResponse> {
    try {
      console.log('Attempting signup with data:', { ...data, password: '[REDACTED]' });
      const response = await axios.post(`${API_URL}/signup`, data);
      console.log('Signup response:', response.data);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message);
      console.error('Full error object:', error);
      throw error.response?.data?.error || 'Signup failed';
    }
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  }
};
