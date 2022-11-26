export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface IToken {
  id: string;
  login: string;
}

export interface IBoard {
  id: string;
  title: string;
  owner: string;
  users: string[];
}
