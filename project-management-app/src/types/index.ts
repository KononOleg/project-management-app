export interface IUser {
  _id: string;
  name: string;
  login: string;
}

export interface IToken {
  id: string;
  login: string;
}

export interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}
