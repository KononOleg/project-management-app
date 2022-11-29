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

  static async createBoard(title: string, owner: string): Promise<AxiosResponse<IBoard>> {
    return $api.post<IBoard>('/boards', { title, owner: owner, users: [] });
  }

  static async updateBoard(board: IBoard): Promise<AxiosResponse<IBoard>> {
    const { _id, ...rest } = board;
    return $api.put<IBoard>(`/boards/${_id}`, { ...rest });
  }

  static async deleteBoard(id: string) {
    return $api.delete(`/boards/${id}`);
  }
}
