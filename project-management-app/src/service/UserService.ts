import { AxiosResponse } from 'axios';
import { IUser } from '../types';
import { SignUpRequest } from '../types/api';
import $api from './http';

export default class UserService {
  static async getUser(id: string): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`/users/${id}`);
  }

  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>(`/users`);
  }

  static async updateUser(id: string, signUpRequest: SignUpRequest): Promise<AxiosResponse<IUser>> {
    const { name, login, password } = signUpRequest;
    return $api.put<IUser>(`/users/${id}`, {
      name,
      login,
      password,
    });
  }
}
