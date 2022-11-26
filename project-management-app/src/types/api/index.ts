import { IBoard } from '..';

export interface SignUpRequest {
  name: string;
  login: string;
  password: string;
}

export interface SignUpResponse {
  id: string;
  name: string;
  login: string;
}

export interface SignInRequest {
  login: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export type AxiosErrorDataType = {
  error: string;
  message: string;
  statusCode: number;
};

export type BoardsResponse = {
  boards: IBoard[];
};
