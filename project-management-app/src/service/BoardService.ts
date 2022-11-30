import $api from './http';
import { AxiosResponse } from 'axios';
import { IColumn, ITask } from '../types';

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
      boardId,
    });
  }

  static async deleteColumn(boardId: string, columnId: string): Promise<AxiosResponse> {
    return await $api.delete(`/boards/${boardId}/columns/${columnId}`);
  }

  static async getTasks(boardId: string, columnId: string): Promise<AxiosResponse<ITask[]>> {
    return await $api.get<ITask[]>(`/boards/${boardId}/columns/${columnId}/tasks`);
  }

  static async addTask(
    boardId: string,
    columnId: string,
    title: string,
    order: number,
    description: string,
    userId: string
  ): Promise<AxiosResponse<ITask>> {
    return await $api.post<ITask>(`/boards/${boardId}/columns/${columnId}/tasks`, {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
      users: [],
    });
  }

  static async updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    title: string,
    order: number,
    description: string,
    userId: string,
    users: string[]
  ): Promise<AxiosResponse<ITask>> {
    return await $api.put<ITask>(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
      users,
    });
  }

  static async transferTask(
    boardId: string,
    columnId: string,
    toColumnId: string,
    taskId: string,
    title: string,
    order: number,
    description: string,
    userId: string,
    users: string[]
  ): Promise<AxiosResponse | undefined> {
    return await $api.put(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      title,
      order,
      description,
      userId,
      boardId,
      columnId: toColumnId,
      users,
    });
  }

  static async deleteTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Promise<AxiosResponse> {
    return await $api.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }
}
