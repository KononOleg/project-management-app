import axios from 'axios';
import { API_HOST } from '../../constants/index';
import { SignInRequest, SignUpRequest } from '../../types/api';

export const signUp = async (name: string, login: string, password: string) => {
  const response = await axios.post<SignUpRequest>(`${API_HOST}/auth/signup`, {
    name,
    login,
    password,
  });
  return response.data;
};

export const signIn = async (login: string, password: string) => {
  const response = await axios.post<SignInRequest>(`${API_HOST}/auth/signin`, {
    login,
    password,
  });
  return response.data;
};
