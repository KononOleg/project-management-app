import $api from './http';
import { AxiosResponse } from 'axios';
import { IColumn } from '../types';

export default class BoardService {
  static async getColumns(boardId: string): Promise<AxiosResponse<IColumn[]>> {
    return await $api.get<IColumn[]>(`/boards/${boardId}/columns`);
  }

  static async createColumn(
    boardId: string,
    titleColumn: string,
    orderColumn: number
  ): Promise<AxiosResponse<IColumn>> {
    return await $api.post<IColumn>(`/boards/${boardId}/columns`, {
      title: titleColumn,
      order: orderColumn,
    });
  }

  static async updateColumn(
    boardId: string,
    columnId: string,
    titleColumn: string,
    orderColumn: number
  ): Promise<AxiosResponse<IColumn>> {
    return await $api.put<IColumn>(`/boards/${boardId}/columns/${columnId}`, {
      title: titleColumn,
      order: orderColumn,
    });
  }

  static async deleteColumn(boardId: string, columnId: string): Promise<AxiosResponse> {
    return await $api.delete(`/boards/${boardId}/columns/${columnId}`);
  }
}
