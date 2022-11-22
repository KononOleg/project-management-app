import { AxiosResponse } from 'axios';
import { IUser } from '../types';
import $api from './http';

export default class UserService {
  static async getUser(id: string): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`"/users"/${id}`);
  }
}
