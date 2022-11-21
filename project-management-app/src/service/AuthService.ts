import $api from './http';
import { AxiosResponse } from 'axios';
import { SignInResponse, SignUpResponse } from '../types/api';

export default class AuthService {
  static async signIn(login: string, password: string): Promise<AxiosResponse<SignInResponse>> {
    return $api.post<SignInResponse>('/auth/signin', {
      login,
      password,
    });
  }

  static async signUp(
    name: string,
    login: string,
    password: string
  ): Promise<AxiosResponse<SignUpResponse>> {
    return $api.post<SignUpResponse>('/auth/signup', {
      name,
      login,
      password,
    });
  }
}
