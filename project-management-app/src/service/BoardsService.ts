import $api from './http';
import { AxiosResponse } from 'axios';
import { IBoard } from '../types';
import { BoardsResponse } from '../types/api';

export default class BoardsService {
  static async getBoards(): Promise<AxiosResponse<BoardsResponse>> {
    return $api.get<BoardsResponse>('/boards');
  }

  static async getBoard(id: string): Promise<AxiosResponse<IBoard>> {
    return $api.get<IBoard>(`/boards/${id}`);
  }

  static async createBoard(title: string): Promise<AxiosResponse<IBoard>> {
    return $api.post<IBoard>('/boards', { title, owner: '2', users: [] });
  }

  static async updateBoard(id: string, title: string): Promise<AxiosResponse<IBoard>> {
    return $api.put<IBoard>(`/boards/${id}`, { title, owner: '2', users: [] });
  }

  static async deleteBoard(id: string) {
    return $api.delete(`/boards/${id}`);
  }
}
