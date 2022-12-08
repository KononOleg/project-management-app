import $api from './http';
import { AxiosResponse } from 'axios';
import { ITask } from '../types';

export default class TasksService {
  static async getTasks(boardId: string, columnId: string): Promise<AxiosResponse<ITask[]>> {
    return await $api.get<ITask[]>(`/boards/${boardId}/columns/${columnId}/tasks`);
  }

  static async createTask(
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
      columnId,
      title,
      order,
      description,
      userId,
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
