// src/services/auth/AuthService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/v1';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const register = async (email: string, password: string, otherData: any) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { email, password, ...otherData });
      return response.data;
    } catch (error) {
      return null;
    }
  };